"use client";

import BlogList from "@/components/blog/BlogList";
import Footer from "@/components/common/Footer";
// import BlogItem from "@/components/blog/BlogItem";
import Header from "@/components/common/Header";
import { ToastContainer,toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer theme="dark"/>
      <Header />
      {/* <BlogItem /> */}
      <BlogList />
      <Footer />
    </>
  );
}
