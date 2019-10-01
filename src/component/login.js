import React from "react";
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from "axios";

import UserCard from "./UserCard"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            userId: 0,
            errors: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:3004/user")
            .then(res => {
                const users = res.data;
                this.setState({
                    users
                })
            })
    }

    handleInputEvent(event) {
        event.preventDefault();
        const { users } = this.state;
        const email = event.target[0].value;
        const password = event.target[1].value;
        const errors = [];
        let listUser = [...users];     

        switch (true) {
            case (email.split("").length === 0):
                errors.push("Empty Email")
                this.setState({
                    errors: errors
                })
                break;
            case (password.split("").length === 0):
                errors.push("Empty Password")
                this.setState({
                    errors: errors
                })
                break;
            case (listUser.find((user) => user.email === email && user.password === password) !==undefined):
                const userid = listUser.find((user) => user.email === email && user.password === password).id;             
                this.setState({
                    userId: userid,
                    errors: null
                });
                break;
            case (listUser.find((user) => user.email === email) !== undefined && listUser.find((user) => user.password === password) === undefined):
                errors.push("Wrong password")
                this.setState({
                    errors: errors
                });
                break;
            case (listUser.find((user) => user.email === email) === undefined):
                errors.push("Wrong Email")
                this.setState({
                    errors: errors
                });
                break;
            default:
                return;
        }

    }
    render() {
        const { errors, users, userId } = this.state;
        if (errors === null) {
            const user = users.find((user) => user.id === userId);
            return (
                <UserCard name={user.name} phone={user.phone} avatar={user.avatar} />
            )
        } else {
            return (
                <div className="login">
                    <h2>Login</h2>
                    {errors.length > 0 ? errors.map((item) => <Alert className="alert alert-danger">{item}</Alert>) : ""}
                    <Form row action="" onSubmit={(e) => this.handleInputEvent(e)}>
                        <FormGroup row>
                            <Label for="Email" sm={3}>Email</Label>
                            <Col sm={12}>
                                <Input type="email" name="email" id="Email" placeholder="Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Password" sm={3}>Password</Label>
                            <Col sm={12}>
                                <Input type="password" name="password" id="Password" placeholder="Password" />
                            </Col>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </div>
            )
        }
    }
}
export default Login;