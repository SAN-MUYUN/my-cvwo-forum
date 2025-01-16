import { PostCard } from "./ui/PostCard";
import { Post } from "../types";
import { useFetchPosts } from "../app/context";

export function FetchPost() {
    const posts = useFetchPosts();

    return (
        <div className="dashboard-content">
            {posts && posts.map((post:Post) => 
                <PostCard key={post.id.toString()} post={post}/>
            )}
        </div>
        
        
    )


}