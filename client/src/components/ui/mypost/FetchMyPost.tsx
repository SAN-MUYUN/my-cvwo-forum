import useSWR from "swr";
import { Post } from "../../../types";
import { fetcher } from "../../../app/Dashboard/MyPost/MyPostPage";
import { MyPostCard } from "./MyPostCard";

export function FetchMyPost() {
    const {data} = useSWR<Post[]>('api/dashboard/mypost', fetcher)
    
    console.log(data)

    return (
        <div className="dashboard-content">
            {data?.map((post:Post) => 
                <MyPostCard key={post.id.toString()} post={post}/>
            )}
        </div>
    )
}