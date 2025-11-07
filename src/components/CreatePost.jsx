import { useState } from "react";
import { auth, db, storage } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !imageFile) {
      alert("Please add text or an image");
      return;
    }
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const imageRef = ref(
          storage,
          `posts/${auth.currentUser.uid}/${Date.now()}_${imageFile.name}`
        );
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "posts"), {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        text,
        imageUrl,
        interestedUsers: [],
        createdAt: serverTimestamp(),
      });

      setText("");
      setImageFile(null);
      alert("Post created!");
    } catch (error) {
      console.error("Error posting:", error);
      alert("Failed to create post: Please");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      marginBottom: 30,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "500px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
    }}>
      <h2 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>Zot Market Posts</h2>
      <textarea
        placeholder="What are you selling or looking for?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: 14,
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontFamily: 'inherit',
          boxSizing: "border-box"
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{
          marginTop: 10,
          fontSize: 14,
        }}
      />
      <button 
        type="submit" 
        disabled={loading} 
        style={{
          marginTop: 10,
          backgroundColor: loading ? "#ccc" : "#4f46e5",
          color: "white",
          border: "none",
          padding: "10px",
          fontSize: 16,
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
