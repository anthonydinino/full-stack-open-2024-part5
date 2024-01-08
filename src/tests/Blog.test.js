import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog/>", () => {
  let container;

  beforeEach(() => {
    const blog = {
      user: { name: "Test User" },
      title: "Component testing",
      author: "Anthony",
      likes: 2,
      url: "https://test.com/blogs/1",
    };
    container = render(<Blog blog={blog} />).container;
  });

  test("renders and shows title and author but not URL or likes", () => {
    expect(container).toHaveTextContent("Component testing Anthony");
    const title = screen.queryByText("2", { exact: false });
    const url = screen.queryByText("https://test.com/blogs/1", {
      exact: false,
    });
    expect(title).toBeNull();
    expect(url).toBeNull();
  });

  test("url and likes are shown when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.queryByText("view");
    await user.click(button);
    const title = screen.queryByText("2", { exact: false });
    const url = screen.queryByText("https://test.com/blogs/1", {
      exact: false,
    });
    expect(title).not.toBeNull();
    expect(url).not.toBeNull();
  });
});
