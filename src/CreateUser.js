import React from 'react';
import { withRouter } from 'react-router';
import { findDOMNode } from 'react-dom';

import UserStore from './UserStore';

const CreateUser = withRouter(React.createClass({

    createUser(event) {
        event.preventDefault();

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

export default CreateUser;