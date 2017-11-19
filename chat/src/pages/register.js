import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Button } from "semantic-ui-react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"

import fire from "../fire"
import { updateFromDb } from "../actions"
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
const db = fire.firestore()

class RegisterPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userData: {
				userName: "",
				email: "",
				phone: "",
				image_url: "",
				password: ""
			}
		}
	}

	inputChange = event => {
		const userData = this.state.userData
		userData[event.target.name] = event.target.value
		this.setState({
			userData: userData
		})
	}

	componentDidMount() {
		const self = this
		console.log(fire.auth().currentUser)
		fire.auth().onAuthStateChanged(function(user) {
			if (user) {
				localStorage.setItem("user", user.email)
			} else {
				localStorage.removeItem("user")
			}
		})
	}

	submitData = () => {
		const { userData } = this.state
		db
			.collection("user")
			.doc(userData.userName)
			.get()
			.then(doc => {
				if (doc.exists) {
					alert("userName already taken")
				} else {
					const { userName, email, phone, image_url, password } = userData
					fire
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then(succ => {
							db
								.collection("user")
								.doc(email)
								.set({
									userName,
									email,
									phone,
									image_url
								})
								.then(() => {
									const newUserData = {}
									Object.keys(this.state.userData).forEach(key => {
										newUserData[key] = ""
									})
									this.setState({ userData: newUserData })
									alert("register success")
									localStorage.setItem("user", email)
								})
						})
				}
			})
	}

	render() {
		if (localStorage.getItem("user")) {
			return <Redirect to="/" />
		}
		return (
			<div>
				<Header />
				<Tittle>Register</Tittle>
				<Container>
					<Form>
						<Form.Field>
							<label>User Name</label>
							<input
								placeholder="User Name"
								name="userName"
								onChange={this.inputChange}
								value={this.state.userData.userName}
							/>
						</Form.Field>
						<Form.Field>
							<label>Email</label>
							<input
								placeholder="Email"
								name="email"
								onChange={this.inputChange}
								value={this.state.userData.email}
							/>
						</Form.Field>
						<Form.Field>
							<label>Phone</label>
							<input
								placeholder="Phone"
								name="phone"
								onChange={this.inputChange}
								value={this.state.userData.phone}
							/>
						</Form.Field>
						<Form.Field>
							<label>image url</label>
							<input
								placeholder="Image url"
								name="image_url"
								onChange={this.inputChange}
								value={this.state.userData.image_url}
							/>
						</Form.Field>
						<Form.Field>
							<label>Password</label>
							<input
								placeholder="Password"
								type="password"
								name="password"
								onChange={this.inputChange}
								value={this.state.userData.password}
							/>
						</Form.Field>
						<div>
							<Button color="red">cancel</Button>
							<Button primary onClick={this.submitData}>
								register
							</Button>
						</div>
					</Form>
				</Container>
			</div>
		)
	}
}

export default RegisterPage
