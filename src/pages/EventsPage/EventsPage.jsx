import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './EventsPage.css'

export default function EventsPage() {
    return (
        <div>
            This is the events page
            <Link className="btn" to='/profile'>View Profile</Link>
        </div>
    )
}