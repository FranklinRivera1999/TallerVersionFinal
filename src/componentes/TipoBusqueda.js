import React, { Component } from 'react';
import axios from 'axios';

import CONFIG from '../Configuracion/Config';


export default class TipoBusqueda extends Component {

    state = {
        alumnos: {},
        codigo: 0,
        nombre: '',
        apellido: '',
        idAlumno: 0
    }

    onChangeNombre =(e)=>{
        this.setState({apellido: e.target.value});
    }

    onChangeCodigo =  (e)=>{   
        this.setState({codigo: e.target.value})
        
     }

    onSubmitNombre = async (e) =>{
     e.preventDefault();
     console.log(this.state.apellido);
    // const res = await axios.get(CONFIG+'alumno/leer/'+this.state.apellido.toUpperCase());      
     }

    onSubmitCodigo = async (e) =>{
        e.preventDefault();
        const res = await axios.get(CONFIG+'alumnoprograma/leer/codigo/'+this.state.codigo)
        console.log(res)
       
    }
      

    render() {
     
        return (
            <div>
            <div className="col-md-4 offset-md-5">
            <div className="btn-group  py-3">
            <button type="button" className="btn btn-info btn-lg">Buscar Persona</button>
            <button type="button" className="btn btn-lg btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu">
                <button className="dropdown-item" data-toggle="modal" data-target="#exampleModal">Busqueda por Nombre</button>
                <button className="dropdown-item" data-toggle="modal" data-target="#exampleModa2">Busqueda por Codigo</button>
            </div>
            </div>
            </div>
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Buscar por Nombre</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form-inline px-5" onSubmit={this.onSubmitNombre}>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Ingrese Nombre" onChange={this.onChangeNombre}/>
                                </div>
                                <button type="submit" className="btn btn-success">Buscar</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="modal fade" id="exampleModa2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Buscar por Codigo</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form-inline px-5" onSubmit={this.onSubmitCodigo}>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Ingrese Codigo" onChange={this.onChangeCodigo}/>
                                </div>
                                <button type="submit" className="btn btn-success" >Buscar</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        )
    }
}
