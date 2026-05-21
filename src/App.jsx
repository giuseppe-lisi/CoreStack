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

  return (
    <>
      <h1>data</h1>
      {loading ? (
        <h3 className="flex justify-center mt-50">Page is Loading</h3>
      ) : (
        posts.map((post) => <p>{post.title}</p>)
      )}
    </>
  );
}

export default App;
