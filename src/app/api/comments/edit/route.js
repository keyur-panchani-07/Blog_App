import { NextResponse } from "next/server";
import Reply from "@/lib/models/Reply";
import { ConnectDB } from "@/lib/config/db";
import Comment from "@/lib/models/Comment";

export async function PUT(req) {
  await ConnectDB();
  const { id, type, text } = await req.json();

  if (type === "Comment") {
    await Comment.findByIdAndUpdate(id, { text });
  } else {
    await Reply.findByIdAndUpdate(id, { text });
  }

  return NextResponse.json({ message: "Updated successfully" });
}
