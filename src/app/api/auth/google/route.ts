import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential, accessToken } = await req.json();

    let payload: any = null;

    // --- DUMMY SIMULATION FOR COMPETITION ---
    if (credential === "DUMMY_DEMO_TOKEN") {
      payload = {
        email: "demo.juri@google.com",
        name: "Penguji KREVO (Google)",
        picture: ""
      };
    } else if (accessToken) {
      // Custom UI button flow (returns access_token)
      const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!userInfoRes.ok) {
        return NextResponse.json({ message: "Invalid Google access token" }, { status: 400 });
      }
      payload = await userInfoRes.json();
    } else if (credential) {
      // Standard GoogleLogin button flow (returns credential ID token)
      const clientId = process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER";
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
      });
      payload = ticket.getPayload();
    } else {
      return NextResponse.json({ message: "No Google token provided" }, { status: 400 });
    }

    if (!payload || !payload.email) {
      return NextResponse.json({ message: "Invalid Google token payload" }, { status: 400 });
    }

    await connectDB();

    let user = await User.findOne({ email: payload.email });

    // If user doesn't exist, create one (Register)
    if (!user) {
      // Generate a random secure password for social login users
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = await User.create({
        name: payload.name || "Google User",
        email: payload.email,
        password: hashedPassword,
        role: "user"
      });
    }

    // Generate our own custom JWT just like normal login
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Google login success",
      token
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.json(
      { message: "Server error during Google Authentication" },
      { status: 500 }
    );
  }
}
