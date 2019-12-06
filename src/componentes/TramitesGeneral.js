import React, { Component } from 'react'
import axios from 'axios';
import CONFIG  from '../Configuracion/Config';

import Filtros from './Filtros';
export default class TramitesGeneral extends Component {
    state={
        tramites: [],
        conceptos: [],
        numeroTramite: 0,
        concepto: 0,
        tipo_tramites: [],
        tipo_tramite:'',
        recursos: [],
        recurso: ''
    }

handleChange = e =>{ 
    this.setState({
     [e.target.name]: e.target.value ,
    }) 
}

getTipoTramites= async()=>{
    const resTipoTramite = await axios.get(CONFIG+'Tipo_tramite/lista')
    this.setState({tipo_tramites: resTipoTramite.data})  
}

getConceptos = async ()=>{
    const resConceptos = await axios.get(CONFIG+'concepto/conceptos')
    this.setState({conceptos: resConceptos.data})
}

deleteTramite = async(id) =>{
    await axios.delete(CONFIG+'HistorialTramites/eliminarRegistro/'+id)
    this.getTramites()
}

asignarTramites = (a) =>{
    this.setState({tramites: a})
}

getRecursos = async ()=>{
    const resRecursos = await axios.get(CONFIG+'administrativo/lista')
    this.setState({recursos: resRecursos.data})
}

getTramites = async ()=>{
    const res = await axios.get(CONFIG+'expedienteTotal/lista')
    this.setState({tramites: res.data})
}

buscarConcepto = async (e)=>{
    e.preventDefault()
    console.log(this.state.concepto)
}

buscarTipoTramite = async (e)=>{
    e.preventDefault()
    console.log(this.state.tipo_tramite)
}

buscarRecurso = async (e)=>{
    e.preventDefault()
    console.log(this.state.recurso)
}

async componentDidMount(){
    this.getConceptos()
    this.getTramites()
    this.getTipoTramites()
    this.getRecursos()
}

    render() {
        return (
            <div className="py-4">
                <Filtros  className="py-2" updateTramite={this.asignarTramites} />
                <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">N°</th>
                    <th scope="col">
                    <div className="dropdown">
                        <button type="button" className="btn btn-dark dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                           <strong>Concepto</strong>
                        </button>
                        <div className="dropdown-menu col-sm-2" aria-labelledby="dropdownMenuOffset">
                            <div className="py-1 px-2">
                                <form  onSubmit={this.buscarConcepto}>
                                <div className="form-group">
                                    <label for="exampleDropdownFormEmail1">Concepto :</label>
                                    <select name="concepto" onChange={this.handleChange} className="custom-select custom-select-sm" for="exampleDropdownFormEmail1">
                                        <option value="" disabled selected>Escoger Concepto</option>
                                        {
                                            this.state.conceptos.map(concepto => 
                                                <option value={concepto.idConcepto}>{concepto.concepto}</option>)
                                        }
                                   </select> 
                                </div>
                                <button type="submit" class="btn btn-primary">Buscar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </th>
                    <th scope="col">
                    <div className="dropdown">
                        <button type="button" className="btn btn-dark dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                            <strong>Trámite</strong>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                            <div className="py-1 px-2">
                                <form  onSubmit={this.buscarTipoTramite}>
                                <div className="form-group">
                                    <label for="exampleDropdownFormEmail1">Tipo Trámite :</label>
                                    <select name="tipo_tramite" onChange={this.handleChange} className="custom-select custom-select-sm" for="exampleDropdownFormEmail1">
                                        <option value="" disabled selected>Escoger Trámite</option>
                                        {
                                            this.state.tipo_tramites.map(tipo => 
                                                <option value={tipo.id_tipotramite}>{tipo.desc_tipotramite}</option>)
                                        }
                                   </select> 
                                </div>
                                <button type="submit" class="btn btn-primary">Buscar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </th>
                    <th scope="col">
                    <div className="dropdown mr-1">
                        <button type="button" className="btn btn-dark dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                           <strong>Persona</strong>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                        <p className="dropdown-item">Action</p>
                        </div>
                    </div>
                    </th>
                    <th scope="col">Fecha del Trámite</th>
                    <th scope="col">Fecha de Asignación</th>
                    <th scope="col">
                    <div className="dropdown">
                        <button type="button" className="btn btn-dark dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                            <strong>Recurso</strong>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                            <div className="py-1 px-2">
                                <form  onSubmit={this.buscarRecurso}>
                                <div className="form-group">
                                    <label for="exampleDropdownFormEmail1">Recurso :</label>
                                    <select name="recurso" onChange={this.handleChange} className="custom-select custom-select-sm" for="exampleDropdownFormEmail1">
                                        <option value="" disabled selected>Escoger Recurso</option>
                                        {
                                                this.state.recursos.map(recurso => 
                                                    <option value={recurso.idAdmin}>{recurso.nombres}</option>)
                                        }
                                   </select> 
                                </div>
                                <button type="submit" class="btn btn-primary">Buscar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </th>
                    <th scope="col">
                    <div className="dropdown mr-1">
                        <button type="button" className="btn btn-dark dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                            <strong>Anotación</strong>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                        <p className="dropdown-item">Action</p>
                        </div>
                    </div>
                    </th>
                    <th scope="col">
                    <div className="dropdown mr-1">
                        <button type="button" className="btn btn-dark dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                            <strong>Estado</strong>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                        <p className="dropdown-item">Action</p>
                        </div>
                    </div>
                    </th>
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
