import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import logo from "./logo.svg"
import MainPage from "./pages/main"
import RegisterPage from "./pages/register"
import LoginPage from "./pages/login"
import "./App.css"

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/register" component={RegisterPage} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App
