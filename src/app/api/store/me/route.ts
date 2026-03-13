import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Store from "@/models/Store";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {

  try {

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const store = await Store.findOne({
      owner: decoded.userId
    });

    return NextResponse.json(store);

  } catch (error) {

    console.log("STORE ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }

}