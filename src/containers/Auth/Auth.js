import React, { Component } from "react";
import classes from "./Auth.scss";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";

export default class Auth extends Component {

    loginHandler = () => { };

    registerHandler = () => { };

    submitHandler = event => {
        event.preventDefault();
    };

    render() {
        return (
            <div className={ classes.Auth }>
                <div>
                    <h1>Auth</h1>
                    <form onSubmit={ this.submitHandler } className={ classes.AuthForm }>

                        <Input
                            label="Email"
                        />

                        <Input
                            label="Password"
                            errorMessage={ "validation error..." }
                        />

                        <Button
                            type="success"
                            onClick={ this.loginHandler }
                        >
                            Login
                        </Button>

                        <Button
                            type="primary"
                            onClick={ this.registerHandler }
                        >
                            Registration
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
