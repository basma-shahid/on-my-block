import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default function AuthPage() {
    return(
        <div>
            This is the Home page/ authorization page

            <hr />
            Ater user is signed in: 
            <Link to='/index' >
                <button>View all events</button>
            </Link>

            <Link to='/create' >
                <button>Create an event</button>
            </Link>

        </div>
    )
}