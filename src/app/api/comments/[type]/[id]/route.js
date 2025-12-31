import { NextResponse } from "next/server";
import Comment from "@/lib/models/Comment";
import Reply from "@/lib/models/Reply";
import { deleteRepliesRecursive } from "../../helper";
import { ConnectDB } from "@/lib/config/db";

export async function DELETE(req, { params }) {
  await ConnectDB();

  const { id, type } = await params;

  await deleteRepliesRecursive(id);

  if (type === "comment") {
    await Comment.findByIdAndDelete(id);
  } else {
    await Reply.findByIdAndDelete(id);
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
