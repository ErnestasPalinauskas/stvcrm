//Navigacijos logika, leidimai
//Sukūrė: Karolis Momkus

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/prisijungti";
  const isRestrictedPath =
    path === "/administravimas" ||
    path === "/administravimas/vartotojai" ||
    path === "/administravimas/prasymai" ||
    path === "/administravimas/vartotojai/:path*" ||
    path === "/administravimas/prasymai/:path*";

  let decodedToken: any;
  let userData: any;
  const token = request.cookies.get("token")?.value || "";
  if (!isPublicPath) {
    decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
    userData = decodedToken.payload;
  } else {
    decodedToken = undefined;
    userData = undefined;
  }

  //Leidimų logika
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/kalendorius", request.nextUrl));
  }

  if (!isPublicPath && !token && path !== "/prisijungti") {
    return NextResponse.redirect(new URL("/prisijungti", request.nextUrl));
  }

  if (!isPublicPath && token && isRestrictedPath && userData.role == "0") {
    return NextResponse.redirect(new URL("/kalendorius", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/prisijungti",
    "/kalendorius",
    "/manouzduotys",
    "/administravimas",
    "/administravimas/vartotojai",
    "/administravimas/vartotojai/:path*",
    "/administravimas/prasymai",
    "/administravimas/prasymai/:path*",
  ],
};
