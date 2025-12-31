"use client";

import BlogItemTable from "@/components/AdminComponent/BlogItemTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs || []);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: { id: mongoId },
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-xl mb-4">All Blogs</h1>

      {/* ✅ Scroll container */}
      <div className="h-[75vh] overflow-y-auto border border-gray-300 rounded-md">
        <table className="w-full text-sm text-center text-gray-500 border-collapse">
          {/* ✅ Sticky Header */}
          <thead className="sticky top-0 z-10 bg-gray-50 text-gray-700 uppercase">
            <tr>
              <th className="hidden sm:table-cell px-6 py-3">
                Author Name
              </th>
              <th className="px-6 py-3">Blog Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* 🔄 Loading */}
            {loading && (
              <tr>
                <td colSpan="4" className="py-6 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {/* ❌ No Data */}
            {!loading && blogs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-6 text-center h-[60vh] items-center text-xl text-gray-500 font-medium"
                >
                  No blogs found
                </td>
              </tr>
            )}

            {/* ✅ Data Rows */}
            {!loading &&
              blogs.map((item) => (
                <BlogItemTable
                  key={item._id}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={`/uploads${item.authorImg}`}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
