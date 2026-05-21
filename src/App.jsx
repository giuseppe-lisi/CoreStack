import { useEffect, useEffectEvent, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // retrieval post on page load
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">MOCKUP SITE</h1>
      {/* app body */}
      <div className="grid grid-cols-3 px-30 gap-4 mb-5">
        {loading ? (
          <h3 className="flex justify-center mt-50">Page is Loading</h3>
        ) : (
          posts.map((post) => {
            return (
              <div className="card shadow-sm bg-primary-content">
                <div className="card-body">
                  <small>User: {post.userId}</small>
                  <h2 className="card-title text-xl">{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
