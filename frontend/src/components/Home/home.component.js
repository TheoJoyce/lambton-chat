import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./home.css";
import UserService from "../../services/user.service";
import RegisterForm from "./RegisterForm";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
   <div className="home-container">
      <header className="jumbotron">
          {/* <h3>{this.state.content}</h3> */}
      </header>
        <RegisterForm/>
   </div>
    );
  }
}