export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import cloudinary from "@/lib/config/cloudinary";

// await ConnectDB();

/* =========================
   GET BLOGS
========================= */
export async function GET(request) {
  await ConnectDB();
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }

  const blogs = await BlogModel.find({}).sort({ date: 1 });
  return NextResponse.json({ blogs });
}

/* =========================
   POST BLOG
========================= */
export async function POST(request) {
  await ConnectDB();
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile || typeof imageFile === "string") {
      return NextResponse.json(
        { success: false, msg: "Invalid image file" },
        { status: 400 }
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString(
      "base64"
    )}`;

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "nextjs-blogs",
      resource_type: "image",
    });

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      authorImg: formData.get("authorImg"),
      image: uploadResult.secure_url,
      imageId: uploadResult.public_id,
      date: new Date(),
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE BLOG
========================= */
export async function DELETE(request) {
  await ConnectDB();
  try {
    // const id = request.nextUrl.searchParams.get("id");

    const { searchParams } = new URL(request.url);
const id = searchParams.get("id");

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    if (blog.imageId) {
      await cloudinary.uploader.destroy(blog.imageId);
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Delete failed" }, { status: 500 });
  }
}
