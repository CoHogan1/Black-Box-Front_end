import './App.css'
import React, { Component } from 'react'
import Nav from './nav'
import VacationForm from './newVaca'
import Hotel from './hotels'
import Weather from './weather'

//console.log(process.env.NODE_ENV)
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'heroku url here'
}

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            allVaca: [],
            showModal: false,
            editVaca: {},
            showAll: false,
            toggleAllVaca: false,
        }
    }

    // get all vacations from the DB
    // set this.state.allVaca to whatever is in the db.-------------------------
    getVacations = () => {
        // fetch from the backend
        fetch(baseURL + "/blackbox")
            .then(res => { return res.json()
            }).then(data => {
                // /console.log(data)
                this.setState({
                    allVaca: data,
                    name: "",
                    location: '',
                    dateFrom: '',
                    dateTo: '',
                })
        })
    }//-------------------------------------------------------------------------

    addVaca = (newVaca) => {//--------------------------------------------------
        const copyVaca = [...this.state.allVaca]
        copyVaca.push(newVaca)
        // push places the data at the end of the array.
        //use array.length -1 as an index to get last item.
        //maybe use unshift to add it to the beginning of the array. and [0]
        this.setState({
            allVaca: copyVaca
        })
        console.log(this.state.allVaca[0] + " from addVaca")
    }//-------------------------------------------------------------------------

    deleteVaca = async (id) => {//----------------------------------------------
        const url = baseURL + '/blackbox/' + id
        try{
            const response = await fetch( url, {
                method: 'DELETE'
            })
            if (response.status === 200) {
                const findIndex = this.state.allVaca.findIndex(vaca => vaca._id === id)
                const copyVaca = [...this.state.allVaca]
                copyVaca.splice(findIndex, 1)

                this.setState({
                    allVaca: copyVaca
                })
            }
        }
        catch(err){
            console.log(err)
        }
        window.location.reload(false) // reloads the file.
    }//-------------------------------------------------------------------------

    handleSubmit = async (e) => {//---------------------------------------------
        e.preventDefault()
        //console.log(this.state.editVaca._id)
        const url = baseURL + '/blackbox/' + this.state.editVaca._id

        try{

          const response = await fetch( url , {
            method: 'PUT',
            body: JSON.stringify({
               name: e.target.name.value,
               location: e.target.location.values,
               dateFrom: e.target.dateFrom.values,
               dateTo: e.target.dateTo.values,
            }),
            headers: {
              'Content-Type' : 'application/json'
            }
          })

          if (response.status===200){
            const updatedVacation = await response.json()
            const findIndex = this.state.allVaca.findIndex(vacation => vacation._id === updatedVacation.data._id)
            const copyVacations = [...this.state.allVaca]
            copyVacations[findIndex] = updatedVacation.data

            this.setState({
              allVaca: copyVacations,
              showModal:false
            })
          }
        }
        catch(err){
          console.log('Error => ', err);
        }
        console.log(this.state.allVaca + " here is the vaca");
    }//-------------------------------------------------------------------------


    handleChange = (e)=>{//-----------------------------------------------------
        this.setState({
            [e.target.name]: e.target.value
        })
    }//-------------------------------------------------------------------------

    showEdit = (vacation) => {//------------------------------------------------
        console.log("edit clicked")
        //console.log(vacation)
        this.setState({
            showModal: true,
            name: vacation.name,
            location: vacation.location,
            dateFrom: vacation.dateFrom,
            dateTo: vacation.dateTo,
            editVaca: vacation,
        })
    }//-------------------------------------------------------------------------

    componentDidMount() {
        this.getVacations()
    }


    toggleAllVaca = () =>{
        //console.log("clicking");
        this.setState({
            toggleAllVaca: !this.state.toggleAllVaca
        })
        //console.log(this.state.showAll)
    }


    toggleShowAll = () => {
        //console.log('clicked')
        this.setState({
            showAll: !this.state.showAll
        })
    }



    render() {
        //console.log(this.state.allVaca)
        return (
            <div className="App">

            { this.state.allVaca.length > 0 && <Nav thisIsAProp={this.state.allVaca[this.state.allVaca.length -1]}/>}

            <VacationForm  baseURL={ baseURL } addVacation={ this.addVaca } />

            <button onClick={this.toggleAllVaca}>View Recent Vacations</button>

            <button onClick={this.toggleShowAll}>View Hotels</button>

            {this.state.toggleAllVaca &&
            <div>

            <table className="vacationTable">
              <tbody>
                {this.state.allVaca.map(vaca => {
                    return (
                        <tr key={vaca._id}>
                            <td>{vaca.name}</td>
                            <td>{vaca.location}</td>
                            <td>{vaca.dateFrom}</td>
                            <td>{vaca.dateTo}</td>
                            <td onClick={ ()=> this.deleteVaca(vaca._id) }>~Delete~</td>
                            <td onClick={ ()=> this.showEdit(vaca)}>Edit:</td>
                        </tr>
                    )
                })
                }
              </tbody>
            </table><br/>

            {this.state.showModal &&

                <form onSubmit={this.handleSubmit} className="editForm">
                    <h1>This form edits vaacation</h1>
                    <h1>Edit:</h1>
                    <label>Name:</label>
                    <input name="name"  value={this.state.name} onChange={this.handleChange} ></input><br></br>
                    <label>location:</label>
                    <input name="location" value={this.state.location} onChange={this.handleChange} ></input><br></br>
                    <label>Date From:</label>
                    <input name="dateFrom"  value={this.state.dateFrom} onChange={this.handleChange} ></input><br></br>
                    <label>Date To:</label>
                    <input name="dateTo" value={this.state.dateTo} onChange={this.handleChange} ></input><br></br>
                    <input type="submit" value="Update"></input>
                </form>
            }
        </div>
        }

        {this.state.showAll &&
            
        <div className="hotelsDiv">
            <Hotel vaca={this.state.allVaca[this.state.allVaca.length-1]}/>

        </div>
        }



        {this.state.showAll &&
        <div className="WeatherDiv">Weather
            <Weather vaca={this.state.allVaca[this.state.allVaca.length -1]}/>

        </div>
        }

        </div>
        )
    }
}

export default App
