import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function PostsFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArr = [];
      querySnapshot.forEach((doc) => {
        postsArr.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <p>
            <strong>{post.email}</strong> says:
          </p>
          <p>{post.text}</p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post image"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          )}
          <p style={{ fontSize: "0.8em", color: "#666" }}>
            {post.createdAt?.toDate().toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
