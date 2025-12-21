import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.get("session");
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("session", "", {
    expires: new Date(0),
    path: "/",
  });
  return response;
}
