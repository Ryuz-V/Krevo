import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Store from "@/models/Store";

// GET - List semua sellers dengan info toko mereka
export async function GET() {
  try {
    await connectDB();

    const sellers = await User.find({ role: "seller" }).select("-password").lean();

    const sellersWithStore = await Promise.all(
      sellers.map(async (seller) => {
        const store = await Store.findOne({ owner: seller._id }).lean();
        return { ...seller, store: store || null };
      })
    );

    return NextResponse.json(sellersWithStore);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch sellers" },
      { status: 500 }
    );
  }
}

// PATCH - Suspend atau activate toko seller (ubah storeStatus)
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { storeId, status } = await req.json();

    if (!storeId || !["active", "suspended"].includes(status)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const store = await Store.findByIdAndUpdate(
      storeId,
      { storeStatus: status },
      { new: true }
    );

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Store ${status === "active" ? "activated" : "suspended"} successfully`,
      store,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update store status" },
      { status: 500 }
    );
  }
}