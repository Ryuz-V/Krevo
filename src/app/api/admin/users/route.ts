import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {

    await connectDB();

    const users = await User.find().select("-password");

    return NextResponse.json(users);

  } catch (error) {

    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );

  }
}