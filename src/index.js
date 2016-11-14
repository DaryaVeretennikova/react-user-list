import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router';

import './index.css';

const App = React.createClass({
    getInitialState() {
        return {
            users: [
                { 
                    "id" : 1,
                    "name" : "Joe Smith",
                    "login" : "joe",
                    "email": "joe.smith@mail.com"
                },
                { 
                    "id" : 2,
                    "name" : "Mary Smith",
                    "login" : "mary",
                    "email": "mary.smith@mail.com"
                },
                { 
                    "id" : 3,
                    "name" : "Bill Gates",
                    "login" : "bill",
                    "email": "billy@mail.com"
                }
            ]
        }
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
                        <button>Remove</button>
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
    render() {
      return (
        <div>
          <form className="form">
            <div className="form__row">
                <label for="name" className="form__label">Name</label>
                <input name="name" placeholder="name"/>
            </div>
            <div className="form__row">
                <label for="login" className="form__label">Login</label>
                <input name="login" placeholder="login"/>
            </div>
            <div className="form__row">
                <label for="email" className="form__label">Email</label>
                <input name="email" placeholder="email"/>
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
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/user/new" component={CreateUser} />
  </Router>
), document.getElementById('root'))

