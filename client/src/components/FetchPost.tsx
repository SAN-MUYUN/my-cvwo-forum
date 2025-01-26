import { PostCard } from "./ui/PostCard";
import { Post } from "../types";
import { useFetchPosts } from "../app/context";

// fetch post from database and disply using PostCard component
export function FetchPost() {

    // fetch post from the database
    var posts = useFetchPosts();
    posts = posts?.sort((a:Post, b:Post) => {
            return b.createdAt.valueOf() - a.createdAt.valueOf()
          });

    return (
        <div className="dashboard-content">
            {posts && posts.map((post:Post) => 
                <PostCard key={post.id.toString()} post={post}/>
            )}
        </div>
        
        
    )


}