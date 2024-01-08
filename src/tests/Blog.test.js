import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

test("renders and shows title and author but not URL or likes", () => {
  const blog = {
    title: "Component testing",
    author: "Anthony",
    likes: 2,
    url: "https://test.com/blogs/1",
  };

  const { container } = render(<Blog blog={blog} />);

  const element = screen.getByText("Component testing Anthony", {
    exact: false,
  });

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Component testing Anthony");
  const title = screen.queryByText("2", { exact: false });
  const url = screen.queryByText("https://test.com/blogs/1", { exact: false });
  expect(title).toBeNull();
  expect(url).toBeNull();
});
