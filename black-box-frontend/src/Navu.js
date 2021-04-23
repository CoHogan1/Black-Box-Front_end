import React, { Component } from 'react'
import './App.css'





export default class Navu extends Component {
    constructor(props){
        super(props)
        this.state ={
            showAll: false,
            toggleAllVaca: false,
        }
  
    }

    toggleAllVaca = () =>{
        console.log("clicking");
        this.setState({
            toggleAllVaca: !this.state.toggleAllVaca
        })
        console.log(this.state.showAll)
    }

    toggleShowAll = () => {
        console.log('clicked')
        this.setState({
            showAll: !this.state.showAll
        })
    }
   

    render(props) {
        return(
            <>

                <div className="nav-bar">

                    <div className="home">
                    <a href ="#" className="home">Home</a>

                    </div>
                   
                    <ul className="nav-links">
                        <li onClick={this.toggleShowAll}>View Recent Vacations</li>
                         <li>SignIn</li>
                         <li>LogIn</li>
                    </ul>

                </div>

            </>
        )
    }
}
