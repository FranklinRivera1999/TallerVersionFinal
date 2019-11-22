import React, { Component } from 'react'
import Axios from 'axios';

import CONFIG from '../Configuracion/Config';
import TipoBusqueda from './TipoBusqueda';

export default class Busqueda extends Component {

    state = {
        recursos: [],
        estados: [],
        conceptos: [],
        anotaciones: [],
        tipo_tramites: [],
        numero: '',
        nombre: '',
        concepto: 0,
        tramite: '',
        fechaTramite: new Date(),
        fechaAsignacion: new Date(),
        recurso: 0,
        anotacion: 0,
        estado: 0,
        idPersona: 0,
        observacion: '',
        
    };
     
    

    crearPersona = (a, b) =>{
        this.setState({nombre:b, idPersona:a})
        console.log('Creando Persona')
    }

    onSubmit = async e =>{
        e.preventDefault();
        console.log(this.state)
        this.setState({fechaAsignacion: new Date()})
        await Axios.post(CONFIG+'Expediente_cab/guardarExpediente_cab',{ 
            n_expedediente:this.state.numero,
            f_expediente:this.state.fechaTramite,
            persona_id:this.state.idPersona,
            id_tipotramite:this.state.tramite,
            estado_id:this.state.estado
        })
        await Axios.post(CONFIG+'Expediente_det/guardarExpediente_det',{
            id_expedienteCab: this.state.numero,
            persona_id:this.state.idPersona,
            id_anotacion:this.state.anotacion,
            estado_id: this.state.estado,
            f_asignacion:this.state.fechaAsignacion,
            observaciones:this.scope.observacion
        })  
           
    }


    handleChange = e =>{
        
       this.setState({
         [e.target.name]: e.target.value ,
      })
      
    }

     getTipoTramites= async()=>{
        const resTipoTramite = await Axios.get(CONFIG+'Tipo_tramite/lista')
        this.setState({tipo_tramites: resTipoTramite.data})  
    }

    getEstados = async()=>{
        const resEstado= await Axios.get(CONFIG+'Estado/lista')
        this.setState({estados: resEstado.data})
    }
    getConceptos = async ()=>{
        const resConceptos = await Axios.get(CONFIG+'concepto/conceptos')
        this.setState({conceptos: resConceptos.data})
    }
    getAnotaciones = async () =>{
        const resAnotacion = await Axios.get(CONFIG+'Anotacion/lista')
        console.log(CONFIG+'Anotacion/lista')
        this.setState({anotaciones: resAnotacion.data})
    }
    getRecursos = async ()=>{
        const resRecursos = await Axios.get(CONFIG+'administrativo/lista')
        this.setState({recursos: resRecursos.data})
    }
    componentDidMount(){
        this.getAnotaciones()
        this.getConceptos()
        this.getEstados()
        this.getRecursos()
        this.getTipoTramites()
    }

    render() {
        return (
            <div>
                 <TipoBusqueda addPersona={this.crearPersona} getTramite={this.props.getTramite} className="py4 px-4"/>
                <div className="form-group">
                <form onSubmit={this.onSubmit}>
                <table className="table" >
                    <thead>
                        <tr>
                        <th scope="col">Número</th>
                        <th scope="col">Nombres:</th>
                        <th scope="col">Concepto</th>
                        <th scope="col">Trámite</th>
                        <th scope="col">Fecha del Trámite</th>
                        <th scope="col">Recurso</th>
                        <th scope="col">Anotación</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Observación</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        
                        <th><input type="text" name="numero" onChange={this.handleChange} required className="form-control form-control-sm" /></th>
                        <td><input type="text"  value={this.state.nombre} disabled name="nombre" onChange={this.handleChange} required className="form-control form-control-sm" /></td>
                        <td>
                            <div className="">
                            <select name="concepto" onChange={this.handleChange} className="custom-select custom-select-sm">
                            <option value="" selected>Sin concepto</option>
                            {
                                this.state.conceptos.map(concepto => 
                                    <option value={concepto.idConcepto}>{concepto.concepto}</option>)
                            }
                            </select> 
                            </div>
                        </td>
                        <td> <div className="">
                            <select name="tramite" onChange={this.handleChange} required className="custom-select custom-select-sm">
                            <option value="" disabled selected>Eliga una opción</option>
                            {
                                this.state.tipo_tramites.map(tipo => 
                                    <option value={tipo.id_tipotramite}>{tipo.desc_tipotramite}</option>)
                            }
                            </select> 
                            </div>
                        </td>
                        <td><input type="date" onChange={this.handleChange} name="fechaAsignacion" required className="form-control form-control-sm"/></td>
                        <td> <select name="recurso" onChange={this.handleChange} required className="custom-select custom-select-sm">
                            <option value="null" disabled selected>Elija una Opcion</option>
                            {
                                this.state.recursos.map(recurso => 
                                    <option value={recurso.idAdmin}>{recurso.nombres}</option>)
                            }
                            </select> 
                        </td>
                        <td> 
                        <select name="anotacion" onChange={this.handleChange}  className="custom-select custom-select-sm">
                            <option value="" disabled selected>Eliga una opción</option>
                            {
                                this.state.anotaciones.map(anotacion => 
                                    <option value={anotacion.id_anotacion}>{anotacion.desc_anotacion}</option>)
                            }
                            </select> 
                        </td>
                        <td> <select name="estado" onChange={this.handleChange} required className="custom-select custom-select-sm">
                            <option value="" disabled selected>Eliga una opción</option>
                            {
                                this.state.estados.map(estado => 
                                    <option value={estado.estado_id}>{estado.estado_descripcion}</option>)
                            }
                            </select> 
                        </td>
                        <th><input type="text" name="observacion" onChange={this.handleChange} className="form-control form-control-sm" /></th>
                        <td>
                            <button className="btn btn-success" type="submit">Guardar</button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            </div>  
            </div>
        )
    }
}
