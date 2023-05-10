import React from 'react'
import RegistroForm from './componentes/RegistroForm';
import { useState,useRef,useEffect,useContext } from 'react';
import Contexto from '../../context/context';
export default function Registrarse() {

  const {users,setUsers}=useContext(Contexto);
  const [msj,setMsj] = useState('')
  const email = useRef();
  const password = useRef();
  
  const onSubmitEventRegisto=(e)=>{
    e.preventDefault();
    setMsj('')
  if(email.current.value.length > 0 && password.current.value.length> 0){
    const foundUser = users.find((user) => user.email === email.current.value && user.password === password.current.value);
    const foundUser2 = users.find((user) => user.email === email.current.value);
    if(!foundUser){
      setUsers([...users,{email: email.current.value,password:password.current.value}])
      setMsj('Registrado!!')
    }else if(foundUser2){
      setMsj('Este user ya está registrado con ese email')
    }
     } 
  };

  useEffect(()=>{
    console.log(users)
  },[users]);


  return (
    <>
      <RegistroForm onSubmitEventRegisto={onSubmitEventRegisto}  email={email} password={password} msj={msj}/>
    </>
  )
}
