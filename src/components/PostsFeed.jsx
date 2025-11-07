import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import bike from "../assets/bike.jpg";
import table from "../assets/table.jpg";
import box from "../assets/box.jpg";
import cup from "../assets/cup.jpg";
import tablet from "../assets/tablet.jpg";

export default function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [userEmail, setUserEmail] = useState(null);  // track logged-in user email

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUserEmail(user ? user.email : null);
    });

    // Load posts
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
      const postsArr = [];
      querySnapshot.forEach((doc) => {
        postsArr.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArr);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, []);

  const getImage = (text) => {
    switch (text) {
      case "Looking to sell a bike.":
        return bike;
      case "Selling a table.":
        return table;
      case "Looking to sell a box.":
        return box;
      case "Selling cup.":
        return cup;
      case "Looking to sell a tablet":
        return tablet;
      default:
        return null;
    }
  }

  const handleInterestedClick = async (postId) => {
    if (!auth.currentUser) {
      alert("Please log in to express interest.");
      return;
    }

    const postRef = doc(db, "posts", postId);

    try {
      await updateDoc(postRef, {
        interestedUsers: arrayUnion(auth.currentUser.email),
      });
      alert("You have expressed interest in this post!");
    } catch (error) {
      console.error("Error updating interested users:", error);
      alert("Failed to express interest. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => {
        const isOwner = userEmail === post.email;  // use userEmail from state
        const interestedUsers = post.interestedUsers || [];

        return (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              borderRadius: 5,
              flex: "1 1 300px",
              minWidth: "300px",
              maxWidth: "400px",
            }}
          >
            <p>
              <strong>{post.email}</strong> says:
            </p>
            <p>{post.text}</p>
            {
              <img
                src={getImage(post.text)}
                alt="Post image"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            }
            <p style={{ fontSize: "0.8em", color: "#666" }}>
              {post.createdAt?.toDate().toLocaleString()}
            </p>
            <button onClick={() => handleInterestedClick(post.id)}
              style={{
    backgroundColor: '#4f46e5',
    color: '#d1d5db',  // Tailwind’s gray-300
    border: 'none',
    padding: '8px 8px',
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, boxShadow 0.2s ease',
  }}
  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
  onMouseDown={e => (e.currentTarget.style.backgroundColor = '#3730a3')}
  onMouseUp={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
              
              >
              Interested
            </button>

            {/* Show interested users ONLY to the post owner */}
            {isOwner && interestedUsers.length > 0 && (
              <div style={{ marginTop: 10, fontSize: "0.9em", color: "#007bff" }}>
                Interested Users:
                <ul>
                  {interestedUsers.map((email, index) => (
                    <li key={index}>{email}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
