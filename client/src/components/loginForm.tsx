import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { login } from "../app/methods/methods";
import { useForm } from "@mantine/form";

function LoginForm() {
    const form = useForm({
        initialValues: {
            username:"",
            password:""
        }
    })
    return (
        <form onSubmit={form.onSubmit(login)}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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