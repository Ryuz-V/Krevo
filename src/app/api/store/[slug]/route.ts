import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Store from "@/models/Store";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {

  await connectDB();

  const { slug } = await context.params;

  console.log("PARAM SLUG:", slug);

  const store = await Store.findOne({
    slug: slug
  });

  console.log("STORE RESULT:", store);

  if (!store) {
    return NextResponse.json(
      { message: "Store not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(store);
}