import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../utils/auth';

import { useHistory } from "react-router-dom";

export default function Login() {
  const auth = useAuth();
  const history = useHistory();

  const onSubmit = ({ email, password }: any) => {
    auth.signin(email, password)
      .then((user: any) => history.push("/"))
  }
  return <AuthForm onSubmit={onSubmit} />
}
