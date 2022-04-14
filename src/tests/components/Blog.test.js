// eslint-disable-next-line no-unused-vars
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../../components/Blog';

describe('<Blog/> ', () => {
  let blogContainer;
  let removeBlog;
  let updateBlog;
  beforeEach(() => {
    const blog = {
      title: 'Aventures',
      author: 'Jhon Wick',
      likes: 6,
      url: 'www.aventures.com',
      user: {
        username: 'darcdev',
      },
    };
    const user = {
      username: 'darcdev',
    };

    removeBlog = jest.fn();
    updateBlog = jest.fn();

    blogContainer = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
      />
    ).container;
  });
  test('at start details blog are not displayed', () => {
    const titleBlog = screen.getByText('Aventures by Jhon Wick');
    expect(titleBlog).toBeDefined();

    const detailsContainer = blogContainer.querySelector('.details-blog');
    const urlBlog = screen.queryByText('Url : www.aventures.com');
    const likesBlog = screen.queryByText('Likes : 6');
    // Details is hide
    expect(detailsContainer).toHaveStyle('display : none');
    // Url is not in screen
    expect(urlBlog).not.toBeVisible();
    // Likes is not in screen
    expect(likesBlog).not.toBeVisible();
  });
  test('blog details are visible after clicking the toggle button', () => {
    // Details are visible
    const buttonShow = screen.getByText('View');
    userEvent.click(buttonShow);
    const detailsContainer = blogContainer.querySelector('.details-blog');
    const urlBlog = screen.queryByText('Url : www.aventures.com');
    const likesBlog = screen.queryByText('Likes : 6');

    expect(detailsContainer).not.toHaveStyle('display: none');
    // Url is in the screen
    expect(urlBlog).toBeVisible();
    // Likes is in the screen
    expect(likesBlog).toBeVisible();
  });
  test('after click removeBlog, handler function call one time ', () => {
    // Details are visible
    const buttonShow = screen.getByText('View');
    userEvent.click(buttonShow);
    const updateLikeButton = screen.getByText('Like');
    userEvent.click(updateLikeButton);
    userEvent.click(updateLikeButton);
    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
