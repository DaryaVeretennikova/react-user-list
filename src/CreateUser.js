import React from 'react';
import { withRouter } from 'react-router';
import { findDOMNode } from 'react-dom';

import UserStore from './UserStore';

const CreateUser = withRouter(React.createClass({
    getInitialState: function() {


        return {
            error: '',
            userName: '',
            userLogin: '',
            userEmail: ''
        }
    },

    componentWillMount() {
        this.fillFields();
    },

    createUser(event) {
        event.preventDefault();

        if (findDOMNode(this.refs.name).value === '') {
            this.validateEmptyName();
            return;
        }

        UserStore.addUser({
            id: this.props.location.query['edit'],
            name: findDOMNode(this.refs.name).value,
            login: findDOMNode(this.refs.login).value,
            email: findDOMNode(this.refs.email).value,
        }, () => { this.props.router.push('/') } )
    },

    fillFields() {
        const id = this.props.location.query['edit'];

        if (id === undefined) {
            return;
        }

        const user = UserStore.getUserId(id);
        this.setState({
            userName: user['name'],
            userLogin: user['login'],
            userEmail: user['email']
        });
    },

    validateEmptyName() {
        this.setState({
           error: 'error'
        });
    },

    isError: function() {
        return 'form__row '+ ((this.state.error === '') ? '' : 'error');
    },

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.createUser}>
                    <div className={this.isError()}>
                        <label htmlFor="name" className="form__label">Name</label>
                        <input name="name" ref="name" placeholder="name" className="form__input" defaultValue={this.state.userName} />
                        <div className="form__error">Please fill this field</div>
                    </div>
                    <div className="form__row">
                        <label htmlFor="login" className="form__label">Login</label>
                        <input name="login" ref="login" placeholder="login" className="form__input" defaultValue={this.state.userLogin} />
                    </div>
                    <div className="form__row">
                        <label htmlFor="email" className="form__label">Email</label>
                        <input name="email" ref="email" placeholder="email" className="form__input" defaultValue={this.state.userEmail} />
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