import React from 'react';
import axios from 'axios';
import NavesListadas from './Componentes/NavesListadas';
import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import  ships from '../../data/stars';

export default function Naves() {
  
  const navegarA = useNavigate();
  const[naves, setNaves] = useState([]);
  const [nextUrl,setnextUrl] = useState('');

//llenar Naves//
  const ApiShips = async () =>{
    const shipsContainer = await ships();
    setnextUrl(shipsContainer.next);
    setNaves([...shipsContainer.results]);
  };

  useEffect(()=>{
    ApiShips();
  },[]);

//llenar con más naves//
  const MoreShips= async ()=>{
    if(nextUrl){
    const newData = await axios.get(nextUrl);
    setNaves([...naves,...newData.data.results]);
    setnextUrl(newData.data.next);
    }
};

  const  handleScroll=()=> {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop + windowHeight >= documentHeight) {
        MoreShips(); 
    } 
  };
  
  useEffect(()=>{   
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };  
    
  },[handleScroll]);  


  
  return (
    <> 
     <NavesListadas navegarA={navegarA} naves={naves}/>
    </>
  )
}
