import React, { Component } from 'react'
import axios from 'axios';
import CONFIG  from '../Configuracion/Config';

import Busqueda from './Busqueda';

export default class Main extends Component {

    state={
        tramites: [],
        tramite:{
            persona_nombres: '',
            persona_amaterno: '',
            persona_apaterno: ''
        },
        modificacionesTramite: []
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

getTramite = async (x) =>{
    this.setState({tramite: x})
    console.log(this.state.tramite)
    const res = await axios.get(CONFIG+'expediente_det/lista/'+this.state.tramite.id_expediente)
    this.setState({modificacionesTramite: res.data})

}

    render() {
        return (
            <div>
                <Busqueda getTramite={this.getTramite} className="py-2"/>   
                <div className="card col-sm-6 offset-md-3 py-2">
                <h5 class="card-header h4"><strong>DETALLES DEL REGISTRO:</strong></h5>
                <div className="card-body">
                    <p className="card-text h5">Número de Expediente: {this.state.tramite.n_expediente}</p>
                    <p className="card-text h5">Persona: {this.state.tramite.persona_nombres + ' '+ this.state.tramite.persona_apaterno +' '+ this.state.tramite.persona_amaterno}</p> 
                    <p className="card-text h5">Trámite: {this.state.tramite.desc_tipotramite}</p>
                    <p className="card-text h5">Fecha: {this.state.tramite.f_expediente}</p>
                </div>
                </div>

                <div className="card col-sm-8 offset-md-2 my-2">
                    <div className="card-body">
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Usuario</th>
                         <th scope="col">Anotación</th>
                         <th scope="col">Observación</th>
                          <th scope="col">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.modificacionesTramite.map(mod =>
                            <tr>
                            <th scope="row"></th>
                            <td> {mod.f_asignacion}</td>
                            <td>{mod.persona_apaterno}</td>
                            <td>{mod.desc_anotacion}</td>
                            <td>{mod.observaciones}</td>
                            <td>{mod.estado_descripcion}</td>
                            </tr>
                                )
                        }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}
