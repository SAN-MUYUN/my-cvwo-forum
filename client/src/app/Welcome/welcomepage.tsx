import {
    Container,
    Text,
    Title,
  } from '@mantine/core';
import classes from "./AuthenticationTitle.module.css";
import { Link } from 'react-router-dom';
import LoginForm from '../../components/loginForm';

  export function Welcomepage() {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome to CVWO FORUM 2025
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Link to = "/signUp">
            Create account
          </Link>
        </Text>
        <LoginForm/>
      </Container>
    );
  }

export default Welcomepage