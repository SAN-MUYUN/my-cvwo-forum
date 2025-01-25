import {
    Button,
    Container,
    Paper,
    PasswordInput,
    TextInput,
    Title,
    Text
  } from '@mantine/core';
import classes from "../../app/Welcome/AuthenticationTitle.module.css"
import { useForm } from '@mantine/form';
import { ENDPOINT } from '../../app/methods/methods';
import { useState } from 'react';
import { sendNotification } from './notification';


// Renders the sign up form and handles logic related to sign up.
function SignUpForm() {

    const [isValid, setIsValid] = useState(true)

    async function signUp(user: {username: string, password: string}) {
        console.log("signing up")
        try {

            // try to insert data into database
            const response = await fetch(`${ENDPOINT}/api/signUp/`, 
                { method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body:JSON.stringify(user)
                }
            )
            if (!response.ok) {
                console.log("error")
                setIsValid(false)
            } else {
                setIsValid(true)
                sendNotification("Successful signed up!", "you can return to main page to login", "green")
            }
            
        } catch (error) {
            setIsValid(false)
        }
    }

    const form = useForm({
        initialValues: {
            username:"",
            password:"",
        }
    })

    return (
        <form onSubmit={form.onSubmit(signUp)}>
            <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Sign Up
            </Title>
        
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Text c={"red"} hidden={isValid}> username is taken, try another one </Text>
                <TextInput label="Username" placeholder="xyz" required {...form.getInputProps("username")}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps("password")}/>

                <Button fullWidth mt="xl" type = 'submit'>
                    Sign Up
                </Button>
                <Button fullWidth mt="xl" onClick={() => window.location.href="/"}>
                    back to login page
                </Button>
            </Paper>
            </Container>
        </form>
        
      );
}

export default SignUpForm