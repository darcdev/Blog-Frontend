import React, { useState } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';

const NewBlog = ({ setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.length === 0 || author.length === 0 || url.length === 0) {
      setError('Debe llenar todos los campos');
      return;
    }
    setError('');

    try {
      const { blog } = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs((blogs) => [...blogs, blog]);
      setError(`A new Blog ${title} by ${author} added`);
    } catch (error) {
      setError('Error creating a new blog');
    }
  };

  return (
    <>
      {error.length > 0 && <Notification message={error} setError={setError} />}

      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

export default NewBlog;
