import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ blog, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [actualBlog, setActualBlog] = useState(blog);

  const updateLikes = async () => {
    try {
      const updateBlog = await blogService.update({
        ...actualBlog,
        likes: actualBlog.likes + 1,
      });
      setActualBlog(updateBlog.blog);
    } catch (error) {
      console.log('Ha ocurrido un error al actualizar like');
    }
  };

  const userStorage = window.localStorage.getItem('loggedUser');
  const user = userStorage ? JSON.parse(userStorage) : '';

  return (
    <div style={{ border: '1px solid black', marginBottom: 5 }}>
      <h3>
        {actualBlog.title}{' '}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </h3>
      {detailsVisible && (
        <div>
          <p>Url : {actualBlog.url}</p>
          <p>
            Likes : {actualBlog.likes}{' '}
            <button onClick={updateLikes}>Like</button>
          </p>
          <p>Author : {actualBlog.author}</p>
          {user.username === actualBlog.user.username && (
            <button onClick={() => removeBlog(actualBlog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
  ass: PropTypes.string.isRequired,
};

export default Blog;
