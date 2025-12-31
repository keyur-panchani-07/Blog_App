"use client";

import Image from "next/image";
import React from "react";
import { assets, blog_data } from "../../../public/images/assets";
import Link from "next/link";
import CommentSection from "../comments/CommentSection";

const BlogItem = ({ image, category, title, description, id }) => {
  // console.log("Image = ",image);
  console.log("Id = ", id);
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black cursor-pointer hover:shadow-[-7px_7px_0px_#000000]">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="border-b border-black"
          unoptimized
        />
      </Link>

      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p
          className="mb-3 text-sm tracking-tight text-gray-700"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>

        <CommentSection blogId={id} />

        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center py-2 font-semibold text-center"
        >
          Read more{" "}
          <Image src={assets.arrow} alt="" className="ml-2" width={12} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
