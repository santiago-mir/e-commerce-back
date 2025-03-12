import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers":
          req.headers.get("Access-Control-Request-Headers") ||
          "Content-Type, Authorization",
        Vary: "Origin",
        "Content-Length": "0",
      },
    });
  }

  // Permite continuar con la solicitud original
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
