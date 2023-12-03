import React from 'react'

//Custom Design
import Background from '../../Components/Background';
import Logo from '../../Components/Logo';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import Paragraph from '../../Components/Paragraph';
import BackButton from '../../Components/BackButton';

export default function Start({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
