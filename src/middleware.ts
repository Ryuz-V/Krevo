import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {

    const decoded: any = jwtDecode(token);
    const role = decoded.role;

    const pathname = req.nextUrl.pathname;

    console.log("Middleware role:", role);
    console.log("Path:", pathname);

    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/seller") && role !== "seller") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Arahkan seller yang mencoba membuka buat-toko kembali ke dashboard seller mereka
    if (pathname.startsWith("/become-seller") && role === "seller") {
      return NextResponse.redirect(new URL("/seller", req.url));
    }

    if (pathname.startsWith("/seller") && role !== "seller") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/seller/:path*", "/home", "/home/:path*", "/become-seller"],
};