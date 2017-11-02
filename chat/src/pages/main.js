import React, { Component } from "react"
import {connect} from 'react-redux'

import fire from '../fire'
import { updateFromDb } from '../actions'


const db = fire.firestore()
class MainPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			number: ""
		}

	}

	componentWillMount() {
		db.collection("user")
		.onSnapshot((coll) => {
			const users = []
			coll.forEach(doc => {
				users.push(doc.data())
			})
			console.log(users);
			this.props.updateFromDb(users)
		})
	}
	render() {
		console.log(this.props);
		return (
			<div className="App">
				<header >
					<h1 className="App-title">ini main .js</h1>
						{this.props.users.map(user => {
							return(
								<div>
									<h1 className="App-title">{user.email}</h1>
									<h1 className="App-title">{user.name}</h1>
								</div>
							)
						})}
				</header>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users : state.users
})
const mapDispatchToProps = dispatch => ({
	updateFromDb:(newdata) => dispatch( updateFromDb(newdata) )
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
