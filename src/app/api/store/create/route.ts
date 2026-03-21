import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Store from "@/models/Store";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {

  try {

    await connectDB();

    const { name, description, address, city, logo, banner } = await req.json();

    const cookie = req.headers.get("cookie");
    const token = cookie?.split("token=")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = decoded.userId;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const store = await Store.create({
      name,
      slug,
      description,
      address,
      city,
      owner: userId,
      logo,
      banner
    });

    await User.findByIdAndUpdate(userId, {
      role: "seller"
    });

    const newToken = jwt.sign(
      { userId, role: "seller" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Store created",
      store,
      token: newToken
    });

  } catch (error) {

    return NextResponse.json(
      { message: "Error creating store" },
      { status: 500 }
    );

  }

}