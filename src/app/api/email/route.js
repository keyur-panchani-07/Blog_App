import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";



export async function POST(request) {
  await ConnectDB();
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email Subscribed" });
}

export async function GET(request) {
  await ConnectDB();
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(request) {
  await ConnectDB();
  // const id = await request.nextUrl.searchParams.get("id");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Deleted" });
}
