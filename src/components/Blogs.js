import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import NewBlog from './NewBlog';
import blogService from '../services/blogs';
import Togglable from './Togglable';
const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, [blogs]);

  const removeBlog = async ({ id, title, author }) => {
    try {
      const responseDelete = window.confirm(
        `Remove blog ${title} by ${author}`
      );
      if (!responseDelete) return;

      await blogService.remove(id);
      const updateBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updateBlogs);
    } catch (error) {
      console.log('Ha ocurrido un error al eliminar el blog', error);
    }
  };

  const updateBlog = async (updateObject) => {
    try {
      const { blog: chBlog } = await blogService.update(updateObject);
      const updateBlogs = blogs.map((blog) =>
        blog.id !== chBlog.id ? blog : chBlog
      );
      setBlogs(updateBlogs);
    } catch (error) {
      console.log('Ha ocurrido un error al actualizar like');
    }
  };

  return (
    <>
      <Togglable buttonLabel="create note">
        <NewBlog setBlogs={setBlogs} />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          removeBlog={removeBlog}
          updateBlog={updateBlog}
        />
      ))}
    </>
  );
};

export default Blogs;
