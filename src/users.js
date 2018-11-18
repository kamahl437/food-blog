import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

class Users extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: []
        } 
      this.handleChange = this.handleChange.bind(this)
      //this.addTask = this.addTask.bind(this)
    }

    componentDidMount() {
        return axios.get('http://174.101.79.125:8080/users').then((data) => {
            this.setState({users:_.toArray(data.data)});
        })
    }
//this just moves stuff for bindings
    handleChange(event) {
        let stateClone = _.cloneDeep(this.state);
        stateClone.task[event.target.name] = event.target.value;
        this.setState(stateClone);
    }
    

    render() {
    return (<div>{
            _.map(this.state.users, (user) => {
                let link = `/user/${user["_id"]}`
                return <Link to={link}>{user.name}</Link>
            })}
        </div>
        )
    }
}

export default Users;