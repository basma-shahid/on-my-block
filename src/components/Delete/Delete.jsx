import React, { Component } from "react";

export default function Delete(props) {
    
    
    return(
        <div>
        <input className="btn" onClick={()=>props.getOneEvent(`${props.id}`) }  type="submit" value="Delete"></input>
        </div>
    )
}