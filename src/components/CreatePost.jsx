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
      marginBottom: 20,
      maxWidth: 500,
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
    }}
    
    >
      <textarea
        placeholder="Write your post here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{
        width: "100%",
        resize: "vertical",
        padding: "12px 14px",
        fontSize: 16,
        borderRadius: 8,
        border: "1.5px solid #ccc",
        outline: "none",
        transition: "border-color 0.3s ease",
        fontFamily: 'inherit',
      }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{
        marginTop: 12,
        fontSize: 16,
        cursor: "pointer",
        color: "blue",
      }}
      />
      <button type="submit" disabled={loading} style={{
        marginTop: 14,
        backgroundColor: loading ? "#a5b4fc" : "#4f46e5",
        color: "#d1d5db",
        border: "none",
        padding: "12px 0",
        fontSize: 18,
        borderRadius: 8,
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: loading
          ? "none"
          : "0 2px 8px rgba(79, 70, 229, 0.6)",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        fontWeight: "600",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#4338ca";
      }}
      onMouseLeave={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#4f46e5";
      }}
      onMouseDown={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#3730a3";
      }}
      onMouseUp={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#4f46e5";
      }}>
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
