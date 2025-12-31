// import { NextResponse } from "next/server";
// import { writeFile, mkdir } from "fs/promises";
// import path from "path";
// import { ConnectDB } from "@/lib/config/db";
// import BlogModel from "@/lib/models/BlogModel";
// const fs = require('fs')

// await ConnectDB();

// // GET blogs
// export async function GET(request) {
//   const blogId = request.nextUrl.searchParams.get("id");

//   if (blogId) {
//     const blog = await BlogModel.findById(blogId);
//     return NextResponse.json(blog);
//   }

//   const blogs = await BlogModel.find({});
//   return NextResponse.json({ blogs });
// }

// // POST blog
// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const imageFile = formData.get("image");

//     if (!imageFile || typeof imageFile === "string") {
//       return NextResponse.json(
//         { success: false, msg: "Invalid image file" },
//         { status: 400 }
//       );
//     }

//     // ✅ convert file to buffer
//     const bytes = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadDir = path.join(process.cwd(), "public/uploads");
//     await mkdir(uploadDir, { recursive: true });

//     const fileName = `${Date.now()}_${imageFile.name}`;
//     const filePath = path.join(uploadDir, fileName);

//     await writeFile(filePath, buffer);

//     const imageUrl = `${fileName}`;

//     const blogData = {
//       title: formData.get("title"),
//       description: formData.get("description"),
//       category: formData.get("category"),
//       author: formData.get("author"),
//       authorImg: formData.get("authorImg"),
//       image: imageUrl,
//       // ✅ add current date automatically
//       date: new Date(),
//     };

//     await BlogModel.create(blogData);

//     return NextResponse.json({ success: true, msg: "Blog Added" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, msg: "Server Error" },
//       { status: 500 }
//     );
//   }
// }

// // Creating API Endpoint to delete Blog
 
// export async function DELETE (request){
//     const id = await request.nextUrl.searchParams.get('id');
//     console.log("Id =",id);
//     const blog = await BlogModel.findById(id);
//     console.log("Blog Data = ",blog);
//     fs.unlink(`./public/uploads/${blog.image}`, ()=>{});
//         await BlogModel.findByIdAndDelete(id);
//         return NextResponse.json({msg:"Blog Deleted"})
// }



// import { NextResponse } from "next/server";
// import { ConnectDB } from "@/lib/config/db";
// import BlogModel from "@/lib/models/BlogModel";
// import cloudinary from "@/lib/config/cloudinary";

// await ConnectDB();

// /* =========================
//    GET BLOGS
// ========================= */
// export async function GET(request) {
//   const blogId = request.nextUrl.searchParams.get("id");

//   if (blogId) {
//     const blog = await BlogModel.findById(blogId);
//     return NextResponse.json(blog);
//   }

//   const blogs = await BlogModel.find({});
//   return NextResponse.json({ blogs });
// }

// /* =========================
//    POST BLOG (Cloudinary)
// ========================= */
// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const imageFile = formData.get("image");

//     if (!imageFile || typeof imageFile === "string") {
//       return NextResponse.json(
//         { success: false, msg: "Invalid image file" },
//         { status: 400 }
//       );
//     }

//     // convert image to base64
//     const bytes = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

//     // upload to cloudinary
//     const uploadResult = await cloudinary.uploader.upload(base64Image, {
//       folder: "nextjs-blogs",
//     });

//     const blogData = {
//       title: formData.get("title"),
//       description: formData.get("description"),
//       category: formData.get("category"),
//       author: formData.get("author"),
//       authorImg: formData.get("authorImg"),
//       image: uploadResult.secure_url,     // ✅ cloud image URL
//       imageId: uploadResult.public_id,    // ✅ needed for delete
//       date: new Date(),
//     };

//     await BlogModel.create(blogData);

//     return NextResponse.json({ success: true, msg: "Blog Added" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, msg: "Server Error" },
//       { status: 500 }
//     );
//   }
// }

// /* =========================
//    DELETE BLOG (Cloudinary)
// ========================= */
// export async function DELETE(request) {
//   try {
//     const id = request.nextUrl.searchParams.get("id");

//     const blog = await BlogModel.findById(id);
//     if (!blog) {
//       return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
//     }

//     // delete image from cloudinary
//     if (blog.imageId) {
//       await cloudinary.uploader.destroy(blog.imageId);
//     }

//     await BlogModel.findByIdAndDelete(id);

//     return NextResponse.json({ msg: "Blog Deleted" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { msg: "Delete failed" },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import cloudinary from "@/lib/config/cloudinary";

await ConnectDB();

/* =========================
   GET BLOGS
========================= */
export async function GET(request) {
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
    const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

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
  try {
    const id = request.nextUrl.searchParams.get("id");

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
    return NextResponse.json(
      { msg: "Delete failed" },
      { status: 500 }
    );
  }
}
