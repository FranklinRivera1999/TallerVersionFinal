import React, { Component } from 'react'
import axios from 'axios';
import CONFIG  from '../Configuracion/Config';

import Busqueda from './Busqueda';

export default class Main extends Component {

    state={
        tramites: []
    }

deleteTramite = async(id) =>{
    await axios.delete(CONFIG+'HistorialTramites/eliminarRegistro/'+id);
    this.getTramites();
    console.log('Tramite Eliminado ahora c');
}

getTramites = async ()=>{
    const res = await axios.get(CONFIG+'HistorialTramites/listaTramite')
    this.setState({tramites: res.data})
}

async componentDidMount(){
    this.getTramites();

}


    render() {
        return (
            <div>

                <Busqueda updateTramite={this.getTramites()}/>

                <div>
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Número</th>
                    <th scope="col">Concepto</th>
                    <th scope="col">Trámite</th>
                    <th scope="col">ID Alumno</th>
                    <th scope="col">Fecha del Trámite</th>
                    <th scope="col">Fecha de Asignación</th>
                    <th scope="col">ID Recurso</th>
                    <th scope="col">Anotación</th>
                    <th scope="col">Estado</th>
                    <th scope="col"></th>
                    
                    </tr>
                </thead>
                <tbody>                  
                        {
                            this.state.tramites.map(tramite => 
                            <tr>
                            <th scope="row">{tramite.id_numero_tramite}</th>
                            <td>{tramite.concepto}</td>
                            <td>{tramite.nombre_tramite}</td>
                            <td>{tramite.id_alum}</td>
                            <td>{tramite.fecha_tramite}</td>
                            <td>{tramite.fecha_asignacion}</td>
                            <td>{tramite.id_admin}</td>
                            <td>{tramite.anotacion}</td>
                            <td>{tramite.estado}</td>
                            <td>
                                <button onClick={()=>this.deleteTramite(tramite.id_numero_tramite)} className="btn btn-outline-danger btn-sm">Eliminar</button>
                            </td>
                            
                            </tr>
                            )
                        }  
                </tbody>
                </table>   
                
            </div>
            </div>
        )
    }
}
