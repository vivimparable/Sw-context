import React, { useEffect } from 'react'
import {  useParams } from 'react-router-dom';
import DatosNaves from './Componentes/DatosNaves';
import { useState } from 'react';
import getDetailedStar  from '../../data/detailedStars';
import DatosPeliculas from './Componentes/DatosPeliculas';
import DatosPilotos from './Componentes/DatosPilotos';
import axios from 'axios'
import './NavesDetalladasStyle.scss'
export default function NavesDetalladas() {
    const {id} = useParams();

    //lvl1
    const [details, setDetails] = useState([]); 
    const [image, setImg]=useState('');

    const getFullDetails = async() =>{
        const dataOne =await getDetailedStar(id);
        setDetails(dataOne.data);
        getPilots(dataOne.data);
        getFilms(dataOne.data)
    };


     useEffect(()=>{
        getFullDetails();
        getImagen();
     },[]);

      //Imagen
     const getImagen =async()=>{
      setImg('')
      const dataOne = await axios.get(`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`);
      if(dataOne.status == 200){
        setImg(`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`);   
      }
      }


    //lvl2
    const [pilots, setPilots] = useState([]);
    const [films, setFilms] = useState([]);

     //get pilots
    const getPilots =async(data)=>{
      const dataOne = await Promise.all(
          data.pilots.map(async(a)=>{
              const one = await fetch(a);
              const two = await one.json();
              return two.name;
          })
      )
      
      setPilots(dataOne)    
  };

  //get films
  const getFilms =async(data)=>{
  const dataOne = await Promise.all(
          
          data.films.map(async(a)=>{
              const one = await fetch(a);
              const two = await one.json();
              return two.title;
          })
      )
      setFilms(dataOne)
  };



  return (
    <>

          <main className='row main-details'>
          <DatosNaves image={image} id={id} details={details}/>
          <DatosPeliculas films={films}/>
          <DatosPilotos pilots={pilots}/>
          </main>
    </>
  )
}
