import { NextResponse } from "next/server";
import { getRepliesRecursive } from "./helper";
import { ConnectDB } from "@/lib/config/db";
import Comment from "@/lib/models/Comment";

export async function GET(req) {
  await ConnectDB();

  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blogId");

  const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });

  const result = await Promise.all(
    comments.map(async (comment) => ({
      id: comment._id,
      name: comment.text,
      nodeType: "comment",
      items: await getRepliesRecursive(comment._id),
    }))
  );

  return NextResponse.json({
    id: 1,
    items: result,
  });
}

export async function POST(req) {
  await ConnectDB();
  const { text, author, blogId } = await req.json();

  const comment = await Comment.create({
    text,
    author,
    blogId,
  });

  return NextResponse.json(comment, { status: 201 });
}
