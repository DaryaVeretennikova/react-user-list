import React from 'react';
import { ReactDOM, render, findDOMNode } from 'react-dom';
import { hashHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router';

import UserStore from './UserStore';

import './index.css';

const App = React.createClass({
    getInitialState() {
        return {
            users: UserStore.getUsers()
        }
    },

    componentWillMount() {
        UserStore.init()
    },

    componentDidMount() {
        UserStore.addChangeListener(this.updateUsers)
    },

    componentWillUnmount() {
        UserStore.removeChangeListener(this.updateUsers)
    },

    updateUsers() {
        this.setState({
          users: UserStore.getUsers()
        })
    },

    remove(id) {
        UserStore.removeUser(id);
        this.props.router.push('/')
    },

    render() {
        const rows = this.state.users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.login}</td>
                    <td>{user.email}</td>
                    <td>
                        <button>Edit</button>
                        <button onClick={() => this.remove(user.id)}>Remove</button>
                    </td>
                </tr>
            )
        });

        return (
            <div>              
                <table className="usersList">
                    <thead>
                        <tr>
                          <th>Name</th>
                          <th>Login</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            
                <Link to="/user/new" className="btn">Add user</Link>
            </div>
        )
    }
})

const CreateUser = withRouter(React.createClass({

    createUser(event) {
      event.preventDefault()

      console.log("Save click");

      UserStore.addUser({
        name: findDOMNode(this.refs.name).value,
        login: findDOMNode(this.refs.login).value,
        email: findDOMNode(this.refs.email).value,
      }, () => { this.props.router.push('/') } )
    },

    render() {
      return (
        <div>
          <form className="form" onSubmit={this.createUser}>
            <div className="form__row">
                <label htmlFor="name" className="form__label">Name</label>
                <input name="name" ref="name" placeholder="name"/>
            </div>
            <div className="form__row">
                <label htmlFor="login" className="form__label">Login</label>
                <input name="login" ref="login" placeholder="login"/>
            </div>
            <div className="form__row">
                <label htmlFor="email" className="form__label">Email</label>
                <input name="email" ref="email" placeholder="email"/>
            </div>
            <div className="form__row">
                <input type="submit" value="save" className="form__submit" />
            </div>
          </form>
        </div>
      );
    }
}));

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/user/new" component={CreateUser} />
  </Router>
), document.getElementById('root'))

