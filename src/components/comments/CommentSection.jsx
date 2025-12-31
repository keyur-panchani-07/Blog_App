"use client";

import { useEffect, useState } from "react";
import { fetchComments, createComment } from "@/app/api/commentApi";
import Comment from "./Comment";

const CommentSection = ({ blogId }) => {
  const [tree, setTree] = useState(null);
  const [text, setText] = useState("");

  const loadComments = async () => {
    const res = await fetchComments(blogId);
    setTree(res.data);
  };

  useEffect(() => {
    if (blogId) loadComments();
  }, [blogId]);

  const addComment = async () => {
    if (!text.trim()) return;
    await createComment(text, blogId);
    setText("");
    loadComments();
  };

  return (
    <div className="mt-10 border-t pt-10">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>

      <div className="flex gap-3 mb-8">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border px-4 py-2 w-full rounded"
        />
        <button
          onClick={addComment}
          className="bg-black text-white cursor-pointer px-6 rounded"
        >
          Add
        </button>
      </div>

      {tree && <Comment comment={tree} refresh={loadComments} />}
    </div>
  );
};

export default CommentSection;
