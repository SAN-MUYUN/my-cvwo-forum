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

export async function createPost(post: {title:string, body:string,tags:string[], createdAt:Number}) {
    console.log(post);
}