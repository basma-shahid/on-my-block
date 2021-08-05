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
            let newList = newList();
    } catch (err) {
        console.log("this is one error", err);
    }
}

    newList = async () => {
        try{
            let jwt = localStorage.getItem('token')
            let fetchEventsResponse = await fetch("/api/events", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            })
            let newEvents = await fetchEventsResponse.json();
            console.log("this is the user's event", newEvents)
            this.setState({events: newEvents})
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
                <table class="cards-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Time</th>
            <th>Details</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{event.name} </td>
            <td>{event.location} </td>
            <td>{event.time} </td>
            <td>{event.details} </td>
            <td><Delete id={event._id} getOneEvent={this.getOneEvent} /></td>
        </tr>
    </tbody>
</table>
                
                )}
        </div>
    )
   }
}

