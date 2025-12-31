import axios from "axios";

const API = axios.create({
  baseURL: "/api/comments",
});

export const fetchComments = (blogId) =>
  API.get(`/?blogId=${blogId}`);

export const createComment = (text, blogId) =>
  API.post("/", { text, blogId });

export const createReply = (data) =>
  API.post("/reply", data);

export const editNodeApi = (data) =>
  API.put("/edit", data);

// export const deleteNodeApi = (type, id) =>
//   API.delete(`/${type}/${id}`);


export const deleteNodeApi = (type, id) =>
  API.delete(`/${type.toLowerCase()}/${id}`);
