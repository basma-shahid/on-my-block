import { Component } from 'react';
import './EventForm.css'

export default class EventForm extends Component {

    state = {
        name: "",
        location: "",    
    }

    addEvent = async (e) => {
        e.preventDefault(); 
        //this is to stop refresh. e has to be added to parameter
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch('/api/events', {
                method: 'POST',
                headers: {"Content-Type": "application/json",
                'Authorization': 'Bearer ' + jwt},
                body: JSON.stringify({
                    name: this.state.name,
                    location: this.state.location,
                })
                // send the body object to server
                
            })
            let serverResponse = await fetchResponse.json()
            
            // if the event was sent over without errors, set state to empty
            this.setState({
                name: "",
                location: ""
            })
        } catch (err){
            console.error("Error:", err)
        }
    }

    handleChange = e => {
        console.log(e.target.checkValidity());
        this.setState({
            [e.target.name]: e.target.value 
            // this is referring to name in the input element not name in state
        })
    }


    render(){
        return(
        <>

            {/* this should be a component */}
            <form className="eventCreation" >
                
                    <input placeholder="enter event name" type="text" name="name" value={this.state.name} onChange={this.handleChange}  />
            
                    <input placeholder="enter event address" type="text" name="location" value={this.state.location} onChange={this.handleChange} />
                
                <button onClick={this.addEvent}>Add event</button>
            </form>
        </>
        )
    }
}