import React, { Component } from 'react';
import { withRouter } from 'react-router'
import './App.css';

class UserList extends Component {
  render() {
    return (
      <div>
        <h1>User list</h1>
        <button>add user</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Login</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}



const CreateUser = withRouter(
  React.createClass({
    render() {
      return (
        <div>
          <form>
            <label for="name">Name</label>
            <input name="name" placeholder="name"/>
            <label for="login">Login</label>
            <input name="login" placeholder="login"/>
            <label for="email">Email</label>
            <input name="email" placeholder="email"/>
            <input type="submit" value="save" />
          </form>
        </div>
      );
    }
  }));

class App extends Component {
  render() {
    return (
      <div>
        <p>Hello world!</p>
        <UserList />
      </div>
    );    
  }
}

export default { App, CreateUser };