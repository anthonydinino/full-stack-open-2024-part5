import { useState } from "react";
import blogs from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, refreshBlogs }) => {
  const [showBlog, setShowBlog] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = async () => {
    await blogs.put(blog.id, {
      ...blog,
      likes: ++blog.likes,
      user: blog.user.id,
    });
    refreshBlogs();
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogs.deleteBlog(blog.id);
      refreshBlogs();
    }
  };

  const blogDetails = () => {
    return (
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <div style={{ display: "flex" }}>
          <p>likes {blog.likes}</p>
          <button onClick={addLike}>like</button>
        </div>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlog}>remove</button>
      </div>
    );
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowBlog(!showBlog)}>
        {showBlog ? "hide" : "view"}
      </button>
      {showBlog && blogDetails()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  refreshBlogs: PropTypes.func.isRequired,
};

export default Blog;
