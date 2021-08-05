import React, { Component } from "react";

export default class EventDetails extends Component{
    

    state = {
        events: []
    }

    getUserEvents = async () => {
        try{
            let jwt = localStorage.getItem('token')
            let fetchEventsResponse = await fetch("/api", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            })
            let allEvents = await fetchEventsResponse.json();
            console.log("this is the user's event", allEvents)
            this.setState({events: allEvents})
        }catch(err){
            console.log('error', err)
        }
    }

    componentDidMount() {
        this.getUserEvents()
    }

   render(){
    return (
        <div>
            {this.state.events.map(event =>
            <div>
                <li>name:{event.name} location:{event.location} at:{event.time} on:{event.date}
                details:{event.details}
                </li> 
                
            </div>
                )}
        </div>
    )
   }
}