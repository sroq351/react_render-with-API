import { useState } from "react";
import { useEffect } from "react";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/posts?sortBy=title&order=asc")
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
      })
      .catch(() => {
        setError("Server error");
      });
  }, []);

  if (error) {
    return <p> {error}</p>;
  }

  if (posts.length === 0) {
    return <p> No posts </p>;
  }

  return (
    <section>
      <h3> Posts ...</h3>
      <section>
        {posts.map((post) => (
          <div key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </section>
    </section>
  );
};
