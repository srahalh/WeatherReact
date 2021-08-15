import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  //State del resultado de la consulta API
  const [resultado, guardarResultado] = useState({});

  //State del error
  const [error, guardarError] = useState(false)

 
  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  });

  //Extraer ciudad y pais
  const  {ciudad, pais} = busqueda ;
  //State de consulta
  const [consultar, guardarConsultar] = useState(false);
  //Cambios en el estado ciudad pais
  useEffect(() => {
    const API = async () => {
      if(consultar){
        const appID = 'bcf98d825f3fda203da3a5a13c6f9bec';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json(); 

        guardarResultado(resultado);
        guardarConsultar(false);//Para que retorne a false y se puedan hacer otras consultas

        // Detecta si hubo resultados correctos en la consulta

        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }

      }
    }
    API();
  }, [consultar]);

  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima 
                    resultado={resultado}
                />
  }


  return (
    <Fragment>
      <Header
        titulo='Clima React App'
       />
     <div className="contenedor-form">
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <Formulario 
                        busqueda={busqueda}
                        guardarBusqueda={guardarBusqueda}
                        guardarConsultar={guardarConsultar}
                        />
                    </div>
                    <div className="col m6 s12">
                      {componente}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    
  );
}

export default App;
