import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import AddTask from './AddTask';
import Users from './users';
import User from './user';
import Game from './Game'
import registerServiceWorker from './registerServiceWorker';

    ReactDOM.render(
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">View All tasks</Link>
                    </li>
                    <li>
                        <Link to="/add-task/">add task</Link>
                    </li>
                    <li>
                        <Link to="/users/">view users</Link>
                    </li>
                </ul>

                <Route exact path="/" component={App}/>
                <Route path="/add-task/" component={AddTask}/>
                <Route path="/users/" component={Users}/>
                <Route path="/user/:userId" component={User}/>
            </div>
        </BrowserRouter>

, document.getElementById('root'));



registerServiceWorker();
