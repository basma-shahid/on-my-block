import React, { Component } from "react"

export default class  AnotherCom extends Component {


    state = {
        user: ""
    }

    

    componentDidMount (){
        this.findUser(this.props.id);

    }

    findUser = async (id) => {
        try{
            let jwt = localStorage.getItem('token')
            let fetchEventsResponse = await fetch(`/api/${id}`
            , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            }) 
            let user = await fetchEventsResponse.json();
            console.log("this is the user", user)
            this.setState({
                user: user
            })

        } catch(err){
            console.log("this is the error", err)
        }
        
    }



   render(){




       return(
          <div >{this.state.user}</div>
      
        )
      
}
}



