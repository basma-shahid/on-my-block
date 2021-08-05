import React, { Component } from "react";

export default function Delete(props) {


    
    return(
        <div>
        <button onClick={()=>props.getOneEvent(`${props.id}`) }  type="submit" value="delete">Delete</button>
        </div>
    )
}