//Navigacijos logika, leidimai
//Sukūrė: Karolis Momkus

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/prisijungti";
  const isRestrictedPath = path.startsWith("/administravimas");

  let decodedToken: any;
  let userData: any;
  let isExpired = false;
  const token = request.cookies.get("token")?.value || "";
  if (token) {
    try {
      decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
      userData = decodedToken.payload;
    } catch (error: any) {
      isExpired = true;
    }
  } else {
    decodedToken = undefined;
    userData = undefined;
  }

  //Leidimų logika
  //Leidimų logika
  if ((!isPublicPath || isRestrictedPath) && isExpired) {
    return NextResponse.redirect(new URL("/prisijungti", request.nextUrl));
  }

  if (isPublicPath && token && !isExpired) {
    return NextResponse.redirect(new URL("/kalendorius", request.nextUrl));
  }

  if (!isPublicPath && !token && path !== "/prisijungti" && !isExpired) {
    return NextResponse.redirect(new URL("/prisijungti", request.nextUrl));
  }

  if (!isPublicPath && token && isRestrictedPath && userData.role == "0" && !isExpired) {
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
