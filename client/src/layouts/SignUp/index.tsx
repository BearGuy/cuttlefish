import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../utils/auth';

export default function SignUp() {
  const auth = useAuth();
  const onSubmit = ({ email, password }: any) => {
    auth.signup(email, password);
  }
  return <AuthForm onSubmit={onSubmit} />
}

