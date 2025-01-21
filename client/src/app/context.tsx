import { useContext, useEffect, useState } from "react";
import { ENDPOINT } from "./methods/methods";
import { TagsContext } from "./Dashboard/Dashboard";
import { PostCard, PostContext } from "../components/ui/PostCard";
import { Post } from "../types";


export function useFetchPosts() {
    const [posts, setPosts] = useState([]);
    const filteredTags = useContext(TagsContext)
    useEffect(() => {
        fetch(`${ENDPOINT}/api/dashboard/get`, {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(filteredTags)
        })
        .then(r => r.json())
        .then(data => setPosts(data));
    }, [filteredTags]);

    return posts; // Return posts for use in components
}

export function useSinglepostContext() {
    const postInfo = useContext(PostContext)
    if (postInfo == undefined) {
        throw new Error("No post here")
    }
    return postInfo
}

export function useCommentContext(commentUpdate:Number) {
    const [comments, setComments] = useState([])
    const postInfo = useSinglepostContext()
    console.log(postInfo)

    useEffect(() => {
        fetch(`${ENDPOINT}/api/dashboard/comment/${postInfo.id}`, {
            method: "Get"
        }).then((r) => r.json())
        .then((data) => setComments(data))
        console.log(comments)
    }, [postInfo, commentUpdate])

    return comments
}