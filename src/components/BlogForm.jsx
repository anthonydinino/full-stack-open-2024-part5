import { useState } from "react";

const BlogForm = ({ notify, blogService, refreshBlogs }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const createBlog = async (e) => {
    e.preventDefault();
    try {
      await blogService.create(newBlog);
      notify({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        isError: false,
      });
      refreshBlogs();
    } catch (error) {
      notify({ message: error.message, isError: true });
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <label htmlFor="Title">title:</label>
        <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, title: target.value });
          }}
        />
        <br />
        <label htmlFor="Author">author:</label>
        <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, author: target.value });
          }}
        />
        <br />
        <label htmlFor="Url">url:</label>
        <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, url: target.value });
          }}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
