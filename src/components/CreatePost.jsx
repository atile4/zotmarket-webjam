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
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <textarea
        placeholder="Write your post here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%", resize: "vertical" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{ marginTop: 10 }}
      />
      <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
