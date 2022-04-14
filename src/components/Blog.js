import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, removeBlog, updateBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showVisible = { display: detailsVisible ? '' : 'none' };

  const updateLikes = async () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const userStorage = window.localStorage.getItem('loggedUser');
  const user = userStorage ? JSON.parse(userStorage) : '';

  return (
    <div
      className="blog-container"
      style={{ border: '1px solid black', marginBottom: 5 }}
    >
      <h3>
        {blog.title} by {blog.author}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </h3>
      <div className="details-blog" style={showVisible}>
        <p>Url : {blog.url}</p>
        <p>
          Likes : {blog.likes} <button onClick={updateLikes}>Like</button>
        </p>
        <p>Author : {blog.author}</p>
        {user.username === blog.user.username && (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
