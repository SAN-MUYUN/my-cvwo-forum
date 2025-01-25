import useSWR, { KeyedMutator } from "swr";
import { Comment, Post } from "../../types";

// export const ENDPOINT = "";
export const ENDPOINT = "http://localhost:8000"
export const fetcher = (url: string) => fetch(`${ENDPOINT}${url}`).then((r) => r.json());




export async function createPost(post: {title:string, body:string,tags:string[]}) {
    const username = sessionStorage.getItem("user")
    if (username == undefined) {
        console.log("no login");
    } else {
        const newPost = {
            username: username,
            title: post.title, 
            body: post.body, 
            createdAt: Date.now(),
            tags: post.tags
        }
        await updateTags(post.tags);
        await updatePost(newPost)
        window.location.href = "/dashboard"

    }

    
    
}

async function updateTags(tags: string[]) {
    try {
        const response = await fetch(`${ENDPOINT}/api/dashboard/tags/`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(tags)
        }).then((r) => r.json());

        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

async function updatePost(post: {username:string, title:string, body: string, createdAt: Number, tags:string[]}) {
    try {
        const response = await fetch(`${ENDPOINT}/api/dashboard/posts/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(post)
        }).then((r) => r.json())

        console.log(response)

    } catch (error) {
        console.log("failed to update tags")
    }
}

export function displayTime(time: number) {
    return new Date(time).toLocaleDateString() +" " +new Date(time).toLocaleTimeString();
}

export async function loadMyPost() {
    const user = sessionStorage.getItem('user');
    const {data, mutate} = useSWR<Post[]>('/api/dashboard/mypost', fetcher)


    if (user == null) {
        return
    }
    try {
        console.log(data)
        const updated = await fetch(`${ENDPOINT}/api/dashboard/mypost`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then((r) => r.json());

        mutate(updated);

    } catch(error) {
        console.log(error);
    }    
}


export async function deleteMyPost(postId: Number, mutate:KeyedMutator<Post[]>) {

        try {
            const updated = await fetch(`${ENDPOINT}/api/dashboard/mypost/${postId}`, {
                method: "DELETE",
               
            }).then((r) => r.json())
            mutate(updated)  
            
        } catch (error) {
            console.log(error)
        }
}

export async function createComment(comment: {post: Number, content: string}) {
    
    const user = sessionStorage.getItem("user")
    if (user == null) {
        return false
    }

    const newComment: Comment = {
        id: 0,
        post: comment.post,
        user: user,
        body: comment.content,
        createdAt: Date.now()
    }
    try {
        const response = await fetch(`${ENDPOINT}/api/dashboard/comment/${comment.post}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newComment)
        });
        console.log("comment uploaded")
        console.log(response)


    } catch (error) {
        console.log(error)
    }
    
}

export function fetchComments(postId: Number) {
    try {
        const response = fetch(`${ENDPOINT}/api/dashboard/comment/${postId}`, {
            method: "Get"
        }).then((r) => r.json())
        .then((data) => data)
        
        return response

    } catch(error) {
        console.log("error: ", error)
        
    }
}



