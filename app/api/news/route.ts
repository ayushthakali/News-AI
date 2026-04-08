import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "technology";
  const page = searchParams.get("page") || "1";

  const API_KEY = process.env.NEWS_API_KEY;

  const baseUrl = `https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=20&apiKey=${API_KEY}`;

  try {
    const res = await fetch(baseUrl, {
      headers: {
        "User-Agent": "News-AI-App",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || "Quota Exceeded or API Error" },
        { status: res.status },
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch news." },
      { status: 500 },
    );
  }
}
