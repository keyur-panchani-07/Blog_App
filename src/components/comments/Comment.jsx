"use client";

import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import {
  createReply,
  editNodeApi,
  deleteNodeApi,
} from "@/app/api/commentApi";

const Comment = ({ comment, refresh }) => {
  const isRoot = comment.id === 1;

  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
  }, [editMode]);

  const reply = async () => {
    await createReply({
      text: input,
      parentId: comment.id,
      parentType: comment.nodeType === "reply" ? "Reply" : "Comment",
    });

    setInput("");
    setShowInput(false);
    refresh();
  };

  const edit = async () => {
    await editNodeApi({
      id: comment.id,
      type: comment.nodeType === "reply" ? "Reply" : "Comment",
      text: inputRef.current.innerText,
    });

    setEditMode(false);
    refresh();
  };


const del = async () => {
  console.log("Deleting:", comment.nodeType, comment.id);

  await deleteNodeApi(comment.nodeType, comment.id);
  refresh();
};


  return (
    <div className="ml-6 mt-4">
      {!isRoot && (
        <div className="border p-3 rounded">
          <span
            contentEditable={editMode}
            ref={inputRef}
            suppressContentEditableWarning
            className="block"
          >
            {comment.name}
          </span>

          <div className="flex gap-3 mt-2 text-sm">
            {editMode ? (
              <>
                <Action type="SAVE" onClick={edit} />
                <Action type="CANCEL" onClick={() => setEditMode(false)} />
              </>
            ) : (
              <>
                <Action type="REPLY" onClick={() => setShowInput(!showInput)} />
                <Action type="EDIT" onClick={() => setEditMode(true)} />
                <Action type="DELETE" onClick={del} />
              </>
            )}
          </div>
        </div>
      )}

      {showInput && !isRoot && (
        <div className="flex gap-2 mt-2 ml-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write reply..."
            className="border px-2 py-1 w-full rounded"
          />
          <Action type="ADD" onClick={reply} />
        </div>
      )}

      {comment.items?.map((child) => (
        <Comment
          key={child.id}
          comment={child}
          refresh={refresh}
        />
      ))}
    </div>
  );
};

export default Comment;
