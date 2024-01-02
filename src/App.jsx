import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (e) => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage(e.response.data.msg || e.message || "Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      if (blog) {
        console.log(blog);
      }
    } catch (error) {
      setErrorMessage(error.response.data.msg || error.message);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>

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

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
