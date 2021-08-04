import { Component } from 'react';
import './EventForm.css'
//add lat and lng and time when event create and send to server
export default class EventForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: "",
        };
    }

    addEvent = async (e) => {
        e.preventDefault();
        //this is to stop refresh. e has to be added to parameter
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify({
                    name: this.state.name,
                    location: this.state.location,
                    lat: this.props.event.lat,
                    lng: this.props.event.lng,
                    time: this.props.event.time,
                })
                // send the body object to server

            })
            let serverResponse = await fetchResponse.json()
            this.props.updateMarker({
                name: this.state.name,
                location: this.state.location,
                lat: this.props.event.lat,
                lng: this.props.event.lng,
            });
            // if the event was sent over without errors, set state to empty
            this.setState({
                name: "",
                location: ""
            })
        } catch (err) {
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


    render() {
        return (
            <>

                {/* this should be a component */}
                <form className="eventCreation" >

                    <input placeholder="enter event name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />

                    <input placeholder="enter event address" type="text" name="location" value={this.state.location} onChange={this.handleChange} />

                    <button onClick={this.addEvent}>Add event</button>
                </form>
            </>
        )
    }
}