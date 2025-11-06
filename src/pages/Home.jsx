import Header from "../components/Header"
import CreatePost from "../components/CreatePost";
import PostsFeed from "../components/PostsFeed";
function Home() {
  return (
    
    <>
    <Header />
     <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Zot Market Posts</h1>
      <CreatePost />
      <PostsFeed />
    </div>
      
    </>
  )
}

export default Home
