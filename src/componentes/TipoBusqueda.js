import React, { Component } from 'react';
import axios from 'axios';

import CONFIG from '../Configuracion/Config';


export default class TipoBusqueda extends Component {

    state = {
        alumnos: {},
        numero: '',
        nombres: '',
        apellido: '',
        idAlumno: 0,
        tramites:[],
        tramite: {},
        tramiteSeleccionado:''
    }

    resultados= () => {
        if(this.state.tramites.length > 0){
            return (
                <div>
                 <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tipo Trámite</th>
                                <th scope="col">Fecha</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.tramites.map(tramite => 
                                    <tr>
                                    <th scope="row">{tramite.n_expediente}</th>
                                    <td>{tramite.desc_tipotramite}</td>
                                    <td>{tramite.f_expediente}</td>
                                    <td>
                                    <button onClick={()=>this.seleccionarTramite(tramite.n_expediente)} className="btn btn-outline-info btn-sm">Select</button>
                                    </td>
                                    </tr>)
                            }
                            </tbody>
                            </table>
                            <button data-dismiss="modal" onClick={()=>this.verTramite(this.state.tramiteSeleccionado)} className="btn btn-outline-info mx-4 py-2 my-2" data-toggle="modal" data-target=".bd-example-modal-lg">Buscar</button> 
                            </div>  
            );
        }
        else{
            return(
                <h4>No se encontraron Trámites</h4>
            );
        }
    }

    handleChange = e =>{  
        this.setState({
          [e.target.name]: e.target.value ,
       }) 
     }

     verTramite = async(id) =>{
       const res =  await axios.get(CONFIG+'pJOINeJOINt//byNTramite/'+id)
       console.log(res)
       this.props.getTramite(res.data)
    }

    seleccionarTramite = (id) =>{
        this.setState({tramiteSeleccionado: id})
    }

    onSubmitnUMERO = async e =>{
        e.preventDefault()
        const res =  await axios.get(CONFIG+'pJOINeJOINt//byNTramite/'+this.state.numero)
       this.props.getTramite(res.data)
    }

     onSubmitNombres = async e =>{
        e.preventDefault() 
        const res = await axios.get(CONFIG+'pJOINeJOINt/byApellido/'+this.state.nombres.toUpperCase())
        this.setState({tramites: res.data})
    }
      

    render() {
     
        return (
            <div>    
                <div className="row py-3 px-5">      
                <form onSubmit={this.onSubmitNombres}>
                    <div className="row px-4">
                        <div className="mx-2">
                            <input onChange={this.handleChange} name="nombres" className="form-control" type="text" placeholder="Ingrese Nombres"/>
                        </div>
                    <button className="btn btn-success px-4" type="submit" data-toggle="modal" data-target="#exampleModal">Buscar por Persona</button>
                    </div>
                </form>
                <form onSubmit={this.onSubmitnUMERO} className="px-8">
                    <div className="row px-6">
                    <div className="mx-2">
                        <input onChange={this.handleChange} name="numero" className="form-control" type="text" placeholder="Ingrese Expediente"/> 
                    </div>
                    <button className="btn btn-success px-4" type="submit">Buscar por Expediente</button> 
                    </div>
                </form>
                </div>   
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Trámites</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <this.resultados/>
                             <button data-dismiss="modal" type="button" className="btn btn-warning px-5" onClick={()=>this.props.addPersona(this.state.tramites[0].persona_id, this.state.tramites[0].persona_nombres)}>Crear Trámite</button>
                        </div>
                        </div>
                    </div>
                </div>
                            
            </div>
        )
    }
}
