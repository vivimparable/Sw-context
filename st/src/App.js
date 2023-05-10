import Rutas from './Router/Router';
import Navegador from './components/Navegador/Navegador';
import Provider from './context/provider';
function App() {

  return (
    <>  
      <Provider>
            <header>
                <Navegador></Navegador>
            </header>
              
            <Rutas/>
      </Provider>
    </>
  );
}

export default App;
