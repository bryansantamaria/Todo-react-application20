import React, { Component } from "react";
import { TextField, Button, Card } from "@material-ui/core";
import { postLogin } from "../utils/api";

class Login extends Component {
  state = { email: "", password: "" };

  login = async () => {
    const { email, password } = this.state;
    const res = await postLogin(email, password);

    console.log(res.data);
    window.localStorage.setItem("token", res.data);
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div>
        {" "}
        <form onSubmit={this.onSubmit} className="accForm">
          <Card className="card">
            <h1>Login</h1>

            <TextField
              className="createInputs"
              type="email"
              name="email"
              variant="outlined"
              size="small"
              required
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email..."
            />

            <TextField
              className="createInputs"
              type="password"
              name="title"
              variant="outlined"
              size="small"
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              placeholder="Password..."
            />
            <div>
              <div id="loginBottom">
                <span id="loginBottom">Dont have an account?</span> <br />
                <a className="createAnchor" href="/create">
                  <span>Create Account</span>
                </a>{" "}
                <Button
                  className="btn-todoitem"
                  type="submit"
                  value="Create Account"
                  variant="contained"
                  id="submitCreate"
                  color="inherit"
                  onClick={this.login}
                >
                  Login
                </Button>{" "}
              </div>
            </div>
          </Card>
        </form>
      </div>
    );
  }
}

export default Login;
