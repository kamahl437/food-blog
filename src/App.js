import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import AddTask from './AddTask';
import './App.css'

class TaskMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      addForm : false
    }
  }
  getTasks() {
    //curl -H "Content-Type: application/json" -d '{"name":"prepare salad","day":"sn","frequency":"w"}' -X POST http://    192.168.1.134:8080/task
    return axios.get('http://174.101.79.125:8080/tasks').then((data) => {
      return data.data;
    })
  }

  componentDidMount() {
    this.getTasks().then((tasks) => {
      this.setState({tasks:_.toArray(tasks)});
    });
  }

  outputTasks() {
    
  }

  render() {
   
    return (
      <div>
       {_.map(this.state.tasks, (task) => {
         return (<div>{task.name}</div>)
       })
      }

      </div>
    );
  }

}


// ========================================

export default TaskMaster;

