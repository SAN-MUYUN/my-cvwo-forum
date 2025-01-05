
export const ENDPOINT = "http://localhost:8000";
export const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export async function login(user: {username: string, password: string}) {

    try {
        const response = await fetch(`${ENDPOINT}/api/login/`, 
            { 
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(user)
            }
        );
         // Ensuring the JSON parsing is awaited
        if (response.ok) {
            console.log("Login successful");
            window.location.href = "/home";
        } else {
            console.log("Login failed: Invalid credentials");
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

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