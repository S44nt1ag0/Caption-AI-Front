import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const dataHisory = await fetch(
      `${process.env.BACKEND_ENDPOINT}/v1/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (dataHisory.ok) {
      const data = await dataHisory.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: "Error request." },
        { status: dataHisory.status }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
