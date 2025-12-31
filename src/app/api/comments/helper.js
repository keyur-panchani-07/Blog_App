import Reply from "@/lib/models/Reply";

export const getRepliesRecursive = async (parentId) => {
  const replies = await Reply.find({ parentId });

  return Promise.all(
    replies.map(async (reply) => ({
      id: reply._id,
      name: reply.text,
      nodeType: "reply",
      items: await getRepliesRecursive(reply._id),
    }))
  );
};

export const deleteRepliesRecursive = async (parentId) => {
  const replies = await Reply.find({ parentId });

  for (const reply of replies) {
    await deleteRepliesRecursive(reply._id);
    await Reply.findByIdAndDelete(reply._id);
  }
};
