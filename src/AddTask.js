import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

class AddTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        task:{
            name:"",
            frequency:"",
            day:""
        } 
      }
      this.handleChange = this.handleChange.bind(this)
      this.addTask = this.addTask.bind(this)
    }


    addTask(event) {
        event.preventTask();
        console.log(event)
        return axios.post('http://174.101.79.125:8080/task',this.state.task).then((data) => {
            return data.data;
        })
    }
    handleChange(event) {
        let stateClone = _.cloneDeep(this.state);
        stateClone.task[event.target.name] = event.target.value;
        this.setState(stateClone);
    }

    render() {
        return (<form>
            lets add a task
            <label>
                Task Name:
                <input type="text" value={this.state.task.name} onChange={this.handleChange} name="name"></input>
            </label>
            <label>
                Frequency
                <input type="text" value={this.state.task.frequency} onChange={this.handleChange} name="frequency"></input>
            </label>
            <label>
                Day
                <input type="text" value={this.state.task.day} onChange={this.handleChange} name="day"></input>
            </label>
            <button onClick={this.addTask}>Add</button>
            </form>);
    }
}

export default AddTask;