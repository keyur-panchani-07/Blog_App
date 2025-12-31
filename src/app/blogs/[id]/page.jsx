"use client";

import { useParams } from "next/navigation";
import { assets, blog_data } from "../../../../public/images/assets";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const fetchBlogData = async () =>{
    const response = await axios.get(`/api/blog?id=${id}`);
    setData(response.data);
    console.log(response.data);
  }

  useEffect(()=>{
    fetchBlogData();
  },[])

  // const blog = blog_data.find((item) => item.id === Number(id));

  // if (!blog) {
  //   return <div>Blog not found</div>;
  // }

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
            <Link href="/">
                <Image src={assets.logo} width={180} alt="" className="sm:w-[130px] w-auto" />
            </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
            {" "}
            Get Started <Image src={assets.arrow} alt="down arrow" />{" "}
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <img
            className="mx-auto mt-6 border border-white rounded-full"
            src={"/uploads/" + "author_img.png"}
            width={60}
            height={60}
            alt="author image"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <img
          className="border-4 border-white"
          src={"/uploads/" + data.image}
          width={1280}
          height={720}  
          alt="main image"
        />
        <p className="blog-content mt-10 text-xl" dangerouslySetInnerHTML={{__html:data.description}}></p>
        <div className="mp-24 mt-14">
            <p className="text-black font font-semibold my-4">Share this article on social media</p>
            <div className="flex">
                <Image src={assets.facebook_icon} width={50} alt="" />
                <Image src={assets.twitter_icon} width={50} alt="" />
                <Image src={assets.googleplus_icon} width={50} alt="" />
            </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
