import React, { Component } from "react";
import Delete from '../Delete/Delete'
import { Route, Switch, Redirect } from 'react-router-dom';


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

    getOneEvent = async (id) => {
        try{
            let jwt = localStorage.getItem('token')
            await fetch(`/api/${id}`
            , {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            }) 
    } catch (err) {
        console.log("this is one error", err);
    }
}


    componentDidMount() {
        this.getUserEvents()
    }

   render(){
    return (
        <div>
            {this.state.events.map(event =>
<<<<<<< HEAD
            <div> 
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{event.name}</td>
                    <td>{event.location}</td>
                    <td>{event.date}</td>
                    <td>{event.details}</td>
                </tr>
            </tbody>
            </table>       
=======
            <div>
                <li>name:{event.name} location:{event.location} at:{event.time} on:{event.date}
                details:{event.details} id: {event._id}

            
                <Delete id={event._id} getOneEvent={this.getOneEvent} />
                
                </li> 
                
                
>>>>>>> 4f80bbcf1099eded474a7d374e506aa4e40172ce
            </div>

                )}
        </div>
    )
   }
}