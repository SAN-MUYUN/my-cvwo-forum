import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
import classes from "../../app/Welcome/AuthenticationTitle.module.css"
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { signUp } from '../../app/methods/methods';

function SignUpForm() {

    const form = useForm({
        initialValues: {
            username:"",
            password:"",
        }
    })
    return (
         //sign up function handles logic regarding sign ups
        <form onSubmit={form.onSubmit(signUp)}>
            <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Sign Up
            </Title>
        
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Username" placeholder="xyz" required {...form.getInputProps("username")}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps("password")}/>

                <Button fullWidth mt="xl" type = 'submit'>
                    Sign Up
                </Button>
            </Paper>
            </Container>
        </form>
        
      );
}

export default SignUpForm