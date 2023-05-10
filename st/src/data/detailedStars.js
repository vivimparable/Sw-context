import axios from 'axios';

const details = async (parametro) => {
  try {
    const  data  = await axios.get('https://swapi.dev/api/starships/'+parametro);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default details;