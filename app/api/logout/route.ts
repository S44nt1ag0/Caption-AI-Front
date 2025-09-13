import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const response = NextResponse.redirect(`${origin}/auth`);

  response.cookies.set("session_token", "", { maxAge: 0 });

  return response;
}
