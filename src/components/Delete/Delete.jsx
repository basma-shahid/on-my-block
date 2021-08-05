import React, { Component } from "react";

export default function Delete(props) {


    
    return(
        <div>
        <input onClick={()=>props.getOneEvent(`${props.id}`) }  type="submit" value="delete"></input>
        </div>
    )
}