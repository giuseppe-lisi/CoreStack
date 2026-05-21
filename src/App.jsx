import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(true);

  // Retrieval post on page load
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const newPostRef = useRef();

  const scrollToForm = () => {
    newPostRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Handle input changes dynamically for both fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdPost = {
      id: posts.length + 1,
      userId: 1, // mock user id
      ...newPost,
    };

    // post added to top of array
    setPosts((prevPosts) => [createdPost, ...prevPosts]);

    // reset form
    setNewPost({ title: "", body: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex justify-between px-5 my-5">
        <h1 className="text-3xl font-bold">MOCKUP SITE</h1>
        <button className="btn btn-neutral" onClick={scrollToForm}>
          Create Post
        </button>
      </div>

      {/* App body */}
      <div className="grid grid-cols-3 px-30 gap-4 mb-5">
        {loading ? (
          <h3 className="flex justify-center mt-50">Page is Loading</h3>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className="card shadow-sm bg-primary-content">
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

      {/* Form Section */}
      <div className="mx-30 mb-6">
        <form ref={newPostRef} onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend">Add new post</legend>

            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              className="input w-full"
              minLength={3}
              placeholder="Post title"
              required
            />

            <label className="label">Body</label>
            <textarea
              name="body"
              value={newPost.body}
              onChange={handleInputChange}
              className="input w-full h-50"
              minLength={10}
              placeholder="Your post goes here..."
              required
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Add Post
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default App;
