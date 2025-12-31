import Image from "next/image";
import React from "react";
import { assets } from "../../../public/images/assets";

const BlogItemTable = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {

     const BlogDate = new Date(date || Date.now());

  return (
    <tr className="bg-white border-b">

      {/* Author column */}
      <th
        scope="row"
        className="hidden sm:table-cell px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {/* ✅ flex moved INSIDE */}
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            alt="Author image"
            src={authorImg || assets.profile_icon.src}
          />
          <p>{author || "No author"}</p>
        </div>
      </th>

      {/* Title */}
      <td className="px-6 py-4">
        {title || "No title"}
      </td>

      {/* Date */}
      <td className="px-6 py-4">
        {BlogDate.toDateString()}
      </td>

      {/* Action */}
      <td onClick={()=>deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer text-red-500 font-bold">
        X
      </td>

    </tr>
  );
};

export default BlogItemTable;
