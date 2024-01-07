import { useState } from "react";
import blogs from "../services/blogs";

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

  const blogDetails = () => {
    return (
      <div>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <div style={{ display: "flex" }}>
          <p>likes {blog.likes}</p>
          <button onClick={addLike}>like</button>
        </div>
        <p>{blog.user.name}</p>
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

export default Blog;
