import React from 'react'
import LoginInputs from './componentes/LoginInputs';
import Contexto from '../../context/context';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Logearse() {

  const {users,setislogged}=useContext(Contexto);

  const email = useRef();
  const password = useRef();

  const navegador = useNavigate();
  
  const onSubmitEvent=(e)=>{
    e.preventDefault();
  const foundUser = users.find((user) => user.email === email.current.value && user.password === password.current.value);
  if (foundUser) {
    setislogged(true);

    alert('Login success');
    navegador('/Naves');
  } else {
    alert("Incorrect email or password.");
  }

  }
  return (
    <>
      <LoginInputs onSubmitEvent={onSubmitEvent} users={users} setislogged={setislogged} email={email} password={password} navegador={navegador} />
    </>
  )
}
