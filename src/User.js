import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

class User extends React.Component {
    constructor(props) {
      super(props);
      console.log(props.match.params);
      this.state = {
        user: {}
        } 
        this.userId = props.match.params.userId;
      this.handleChange = this.handleChange.bind(this)
      //this.addTask = this.addTask.bind(this)
    }

    componentDidMount() {
        return axios.get(`http://174.101.79.125:8080/user/${this.userId}`).then((data) => {
            this.setState({user:data.data});
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
            _.map(this.state.user.tasks, (task) => {
                return (<div>{task.name}</div>)
            })}
        </div>
        )
    }
}

export default User;