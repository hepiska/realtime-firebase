import React, { Component } from "react"
import { Form, Button } from "semantic-ui-react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"


import fire from "../fire"
import Header from "../components/header"

const Container = styled.div`
	margin-top: 100px;
	justify-content: center;
	padding: 50px 300px 50px 300px;
`
const Tittle = styled.h2`
	font-size: 30px;
	color: black;
	margin-buttom: 20px;
`

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginData: {
        email: "",
        password:"",
      },
      isLogin:false,
    }
  }

  inputChange = event => {
    const loginData = this.state.loginData
    loginData[event.target.name] = event.target.value
    this.setState({
      loginData: loginData
    })
  }
  componentDidMount(){
    fire.auth().currentUser ? this.setState({isLogin:true}) : this.setState({isLogin:false})
  }
  onLogin = () => {
    const { loginData } = this.state
    fire.auth().signInWithEmailAndPassword(loginData.email,loginData.password)
    .then(()=>{
      const loginData={
        email:"",
        password:"",
      }
      const self = this
      fire.auth().onAuthStateChanged(function(user) {
        if (user) {
          localStorage.setItem('user',user.email)
          self.setState({
            loginData
          })
        } else {
          localStorage.removeItem('user')
        }
      });


    })
    .catch(err => {
      console.log(err.message);
    })
  }

  render(){
    if (localStorage.getItem('user')) {
      return (
        <Redirect to={{
          pathname: '/',
        }}/>
      )
    } else {
      return(
      <div>
        <Header />
        <Tittle>Login</Tittle>
        <Container>
          <Form>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                name="email"
                onChange={this.inputChange}
                value= {this.state.loginData.email}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.inputChange}
                value= {this.state.loginData.password}
              />
            </Form.Field>
            <div>
              <Button color='red' >cancel</Button>
              <Button primary onClick = { this.onLogin }>Login</Button>
            </div>
          </Form>
        </Container>
      </div>
    )
    }
  }
}

export default LoginPage
