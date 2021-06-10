import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import blogService from "../services/blogs";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      console.log(blogs);
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  return (
    <>
      <NewBlog setBlogs={setBlogs} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
