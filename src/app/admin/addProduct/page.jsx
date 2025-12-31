// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import { assets } from "../../../../public/images/assets";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Page = () => {
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     category: "Startup",
//     author: "Alex jon",
//     authorImg: "/author_img.png",
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       toast.error("Image required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("category", data.category);
//     formData.append("author", data.author);
//     formData.append("authorImg", data.authorImg);

//     // ✅ SEND REAL FILE
//     formData.append("image", image);

//     try {
//       const res = await axios.post("/api/blog", formData);

//       if (res.data.success) {
//         toast.success(res.data.msg);
//         setImage(null);
//         setData({
//           title: "",
//           description: "",
//           category: "Startup",
//           author: "Alex jon",
//           authorImg: "/author_img.png",
//         });
//       }
//     } catch (err) {
//       toast.error("Upload failed");
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="pt-4 px-5 sm:pt-8 sm:pl-16">
//       <p className="text-xl">Upload Image</p>

//       <label htmlFor="image">
//         <Image
//           className="mt-3 cursor-pointer"
//           src={!image ? assets.upload_area : URL.createObjectURL(image)}
//           width={140}
//           height={70}
//           alt="upload"
//         />
//       </label>

//       <input
//         type="file"
//         id="image"
//         hidden
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//         required
//       />

//       <p className="text-xl mt-3">Blog title</p>
//       <input
//         name="title"
//         value={data.title}
//         onChange={onChangeHandler}
//         className="w-full sm:w-[500px] mt-3 px-4 py-3 border"
//         type="text"
//         required
//       />

//       <p className="text-xl mt-3">Blog Description</p>
//       <textarea
//         name="description"
//         value={data.description}
//         onChange={onChangeHandler}
//         className="w-full sm:w-[500px] mt-3 px-4 py-3 border"
//         rows={6}
//         required
//       />

//       <p className="text-xl mt-3">Blog category</p>
//       <select
//         name="category"
//         value={data.category}
//         onChange={onChangeHandler}
//         className="w-40 mt-3 px-4 py-3 border cursor-pointer"
//       >
//         <option value="Startup">Startup</option>
//         <option value="Technology">Technology</option>
//         <option value="Lifestyle">Lifestyle</option>
//       </select>
//         <br />
//       <button className="mt-6 w-40 h-12 bg-black cursor-pointer text-white">
//         Add
//       </button>
//     </form>
//   );
// };

// export default Page;




// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import { assets } from "../../../../public/images/assets";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Page = () => {
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     category: "Startup",
//     author: "Alex jon",
//     authorImg: "/author_img.png",
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       toast.error("Image required");
//       return;
//     }

//     // 🔥 Show toast instantly
//     const toastId = toast.loading("Uploading blog...");

//     // 🔥 Store values before clearing
//     const imageFile = image;
//     const formValues = { ...data };

//     // 🔥 Clear form immediately
//     setImage(null);
//     setData({
//       title: "",
//       description: "",
//       category: "Startup",
//       author: "Alex jon",
//       authorImg: "/author_img.png",
//     });

//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("category", formValues.category);
//     formData.append("author", formValues.author);
//     formData.append("authorImg", formValues.authorImg);
//     formData.append("image", imageFile);

//     try {
//       const res = await axios.post("/api/blog", formData);

//       if (res.data.success) {
//         toast.update(toastId, {
//           render: res.data.msg || "Blog uploaded successfully",
//           type: "success",
//           isLoading: false,
//           autoClose: 2000,
//         });
//       }
//     } catch (error) {
//       toast.update(toastId, {
//         render: "Upload failed",
//         type: "error",
//         isLoading: false,
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="pt-4 px-5 sm:pt-8 sm:pl-16">
//       <p className="text-xl">Upload Image</p>

//       <label htmlFor="image">
//         <Image
//           className="mt-3 cursor-pointer"
//           src={!image ? assets.upload_area : URL.createObjectURL(image)}
//           width={140}
//           height={70}
//           alt="upload"
//         />
//       </label>

//       <input
//         type="file"
//         id="image"
//         hidden
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//       />

//       <p className="text-xl mt-3">Blog title</p>
//       <input
//         name="title"
//         value={data.title}
//         onChange={onChangeHandler}
//         className="w-full sm:w-[500px] mt-3 px-4 py-3 border"
//         type="text"
//         required
//       />

//       <p className="text-xl mt-3">Blog Description</p>
//       <textarea
//         name="description"
//         value={data.description}
//         onChange={onChangeHandler}
//         className="w-full sm:w-[500px] mt-3 px-4 py-3 border"
//         rows={6}
//         required
//       />

//       <p className="text-xl mt-3">Blog category</p>
//       <select
//         name="category"
//         value={data.category}
//         onChange={onChangeHandler}
//         className="w-40 mt-3 px-4 py-3 border cursor-pointer"
//       >
//         <option value="Startup">Startup</option>
//         <option value="Technology">Technology</option>
//         <option value="Lifestyle">Lifestyle</option>
//       </select>

//       <br />
//       <button className="mt-6 w-40 h-12 bg-black cursor-pointer text-white">
//         Add
//       </button>
//     </form>
//   );
// };

// export default Page;




"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "../../../../public/images/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Page = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(assets.upload_area);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex jon",
    authorImg: "/author_img.png",
  });

  /* =========================
     HANDLE IMAGE PREVIEW
  ========================= */
  useEffect(() => {
    if (!image) {
      setPreview(assets.upload_area);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Image required");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Uploading blog...");

    // store values
    const imageFile = image;
    const formValues = { ...data };

    // clear UI instantly (optimistic UX)
    setImage(null);
    setData({
      title: "",
      description: "",
      category: "Startup",
      author: "Alex jon",
      authorImg: "/author_img.png",
    });

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", imageFile);

    try {
      const res = await axios.post("/api/blog", formData);

      toast.update(toastId, {
        render: res.data.msg || "Blog uploaded successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.msg || "Upload failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-4 px-5 sm:pt-8 sm:pl-16">
      <p className="text-xl">Upload Image</p>

      <label htmlFor="image">
        <Image
          className="mt-3 cursor-pointer border"
          src={preview}
          width={140}
          height={70}
          alt="upload"
        />
      </label>

      <input
        type="file"
        id="image"
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <p className="text-xl mt-3">Blog title</p>
      <input
        name="title"
        value={data.title}
        onChange={onChangeHandler}
        className="w-full sm:w-[500px] mt-3 px-4 py-3 border"
        type="text"
        required
      />

      <p className="text-xl mt-3">Blog Description</p>
      <textarea
        name="description"
        value={data.description}
        onChange={onChangeHandler}
        className="w-full sm:w-[500px] mt-3 px-4 py-3 border"
        rows={6}
        required
      />

      <p className="text-xl mt-3">Blog category</p>
      <select
        name="category"
        value={data.category}
        onChange={onChangeHandler}
        className="w-40 mt-3 px-4 py-3 border cursor-pointer"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />

      <button
        disabled={isSubmitting}
        className={`mt-6 w-40 h-12 text-white transition
          ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-black"}`}
      >
        {isSubmitting ? "Uploading..." : "Add"}
      </button>
    </form>
  );
};

export default Page;
