import React, {Component} from 'react';
import {Link} from 'react-router';

import UserStore from './UserStore';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: UserStore.getUsers()
        };
    }

    componentWillMount() {
        UserStore.init()
    }

    componentDidMount() {
        UserStore.addChangeListener(this.updateUsers)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this.updateUsers)
    }

    updateUsers = () => {
        this.setState({
            users: UserStore.getUsers()
        })
    };

    remove(id) {
        UserStore.removeUser(id);
    }

    render() {
        const rows = this.state.users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.login}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link to={{pathname: '/user/new', query: {edit: user.id}}}
                              className="btn btn_theme_action btn_theme_green">
                            Edit
                        </Link>
                        <button onClick={this.remove.bind(this, user.id)}
                                className="btn btn_theme_action btn_theme_red">Remove
                        </button>
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
}

export default App;