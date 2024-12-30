import React, { useState, useEffect } from "react";
import './BlogPosts.css'
import { AiFillLike,AiOutlineShareAlt } from "react-icons/ai";
import sofi from './sofi.png'

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/bermenah/fetch_posts.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.posts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAction = async (id, action) => {
    try {
      const response = await fetch("/bermenah/update_post.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action }),
      });

      const result = await response.json();
      if (result.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id
              ? { ...post, [action + "s"]: post[action + "s"] + 1 }
              : post
          )
        );
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div className="post-header">
            <div className="profile-info">
              <img 
                src={sofi} 
                alt="sofi" 
                className="profile-pic"
              />
              <div className="profile-text">
                <h4 className="profile-name">sofi</h4>
                <span className="post-date">{post.created_at}</span>
              </div>
            </div>
          </div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <div className="video-container">
            <iframe
              width="300"
              height="169"
              src={`https://www.youtube.com/embed/${getYouTubeID(post.youtube_url)}`}
              title={post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="actions">
            <button onClick={() => handleAction(post.id, "like")}>
             <AiFillLike /> Like ({post.likes})
            </button>
            <button onClick={() => handleAction(post.id, "share")}>
             <AiOutlineShareAlt /> Share ({post.shares})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
