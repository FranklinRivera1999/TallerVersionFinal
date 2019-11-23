import React, { Component } from 'react'
import axios from 'axios';
import CONFIG  from '../Configuracion/Config';

import Filtros from './Filtros';
export default class TramitesGeneral extends Component {
    state={
        tramites: []
    }

deleteTramite = async(id) =>{
    await axios.delete(CONFIG+'HistorialTramites/eliminarRegistro/'+id)
    this.getTramites()
}

asignarTramites = (a) =>{
    this.setState({tramites: a})
}

getTramites = async ()=>{
    const res = await axios.get(CONFIG+'expedienteTotal/lista')
    this.setState({tramites: res.data})
}

async componentDidMount(){
    this.getTramites()
}

    render() {
        return (
            <div className="py-4">
                <Filtros  className="py-2" updateTramite={this.asignarTramites} />
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Concepto</th>
                    <th scope="col">Trámite</th>
                    <th scope="col">Persona</th>
                    <th scope="col">Fecha del Trámite</th>
                    <th scope="col">Fecha de Asignación</th>
                    <th scope="col">Recurso</th>
                    <th scope="col">Anotación</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Observaciones</th>
                    </tr>
                </thead>
                <tbody>                  
                        {
                            this.state.tramites.map(tramite => 
                            <tr>
                            <th scope="row">{tramite.n_expediente}</th>
                            <td>{tramite.concep_a}</td>
                            <td>{tramite.desc_tipotramite}</td>
                            <td>{tramite.persona_nombres + ' '+tramite.persona_apaterno +' '+ tramite.persona_amaterno}</td>
                            <td>{tramite.f_expediente}</td>
                            <td>{tramite.f_asignacion}</td>
                            <td>{tramite.apellidos}</td>
                            <td>{tramite.desc_anotacion}</td>
                            <td>{tramite.estado_descripcion}</td>
                            <td>
                               {tramite.observaciones}
                            </td>
                            
                            </tr>
                            )
                        }  
                </tbody>
                </table>   
                
            </div>
        )
    }
}
