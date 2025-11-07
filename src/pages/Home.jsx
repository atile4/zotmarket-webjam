import Header from "../components/Header"
import CreatePost from "../components/CreatePost";
import PostsFeed from "../components/PostsFeed";
function Home() {
  return (
    
    <>
    <Header />
     <div style={{ maxWidth: 1200, margin: "auto", padding: 20 }}>

      <CreatePost />
      <PostsFeed />
    </div>
      
    </>
  )
}

export default Home
