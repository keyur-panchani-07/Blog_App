import { NextResponse } from "next/server"; 
import { ConnectDB } from "@/lib/config/db";
import Reply from "@/lib/models/Reply";

export async function POST(req) {
  await ConnectDB();
  const data = await req.json();

  const reply = await Reply.create(data);

  return NextResponse.json(reply, { status: 201 });
}
