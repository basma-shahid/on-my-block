import React from 'react';
import { Link } from 'react-router-dom';

export default function getPreviousEvents(props){

    
    let previousEventsArray = props.event.map(o => 
        <li>{o}</li> )
        

        return(
            <main className="getPreviousEvents">
                 {previousEventsArray.length > 0 ?
        previousEventsArray
        :
        <span className="no-events">No Previous Events</span>
      }
            </main>
        )
}


