export const ENDPOINT = "http://localhost:8000";
export const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());



export async function signUp(user: {username: string, password: string}) {
    console.log("signing up")
    try {
        const response = await fetch(`${ENDPOINT}/api/signUp/`, 
            { method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify(user)
            }
        ).then(r => r.json());
        console.log(response)
        window.location.href="/"
    } catch (error) {
        console.log("failed to sign up")
    }
}

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

