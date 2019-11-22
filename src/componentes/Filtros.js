import React, { Component } from 'react'

export default class Filtros extends Component {

    state={
        inicio: new Date(),
        final: new Date(),
        nombres: ''
    }
    

    handleChange = e =>{    
        this.setState({
          [e.target.name]: e.target.value ,
       })     
     }

     onSubmit = async e =>{
        e.preventDefault();
        console.log(this.state)
        //this.props.updateTramite()       
    }

    render() {
        return (
            <div className="row">    
                    <form className="form-inline mx-4" onSubmit={this.onSubmit}>
                        <div className="form-group mb-2 mx-1">
                            <label for="inicio">Inicio:</label>
                            <input type="date" className="form-control mx-1"name="inicio" id="inicio" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group mb-2">
                        <label for="final">Fin:</label>
                            <input type="date" className="form-control mx-1" name="final" id="final" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <label for="nombres">Persona:</label>
                            <input  type="text" className="form-control mx-1" name="nombres" id="nombres" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <button className="btn btn-success px-4" type="submit">Filtrar</button>
                        </div>
                    </form>
            </div>
        )
    }
}
