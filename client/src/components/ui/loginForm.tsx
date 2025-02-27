import { Button, Paper, PasswordInput, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ENDPOINT } from "../../app/methods/methods";
import { useState } from "react";
import { sendNotification } from "./notification";

function LoginForm() {

    const [isValid, setIsValid] = useState(true)

    async function login(user: {username: string, password: string}) {

        try {
            const response = await fetch(`${ENDPOINT}/api/login`, 
                { 
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(user)
                }
            );
             // Ensuring the JSON parsing is awaited
            if (response.ok) {
                sessionStorage.setItem("user", user.username);
                setIsValid(true);
                window.location.href = "/dashboard";
            } else {
                setIsValid(false);
            }
            
        } catch (error) {
            sendNotification("Error", "error connecting to server", "red")
        }
    
    }

    const form = useForm({
        initialValues: {
            username:"",
            password:""
        }
    })
    return (
        <form onSubmit={form.onSubmit(login)}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Text c={"red"} hidden={isValid}> Invalid Credentials </Text>
                <TextInput label="Username" placeholder="xyz" required {...form.getInputProps("username")}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps("password")}/>
                <Button fullWidth mt="xl" type="submit">
                    Sign in
                </Button>
            </Paper>
        </form>
        
    )
}

export default LoginForm