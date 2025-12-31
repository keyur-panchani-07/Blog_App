import Image from "next/image";
import React, { useState } from "react";
import { assets } from "../../../public/images/assets";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (  
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="logo image"
          className="w-[130px] max-sm:w-auto"
        />
        <Link href={`/admin/blogList`} className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          {" "}
          Get Started <Image src={assets.arrow} alt="down arrow" />{" "}
        </Link>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[60%] mx-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          officia. Inventore suscipit ducimus recusandae non id reprehenderit,
          voluptas assumenda. Ipsum.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
          action="#"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black cursor-pointer py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white transition-all duration-100"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
