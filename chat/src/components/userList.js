import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"


import fire from "../fire"
import { updateFromDb } from "../actions"
import UserCard from "./userCard"

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 30px 10px 20px;
`

const db = fire.firestore()
class UserList extends Component {
	constructor(props) {
		super(props)
		// this.state = {
		// 	number: ""
		// }
	}

	handleClick = event => {
    console.log(event.target);
		db.collection('chatRoom')
    .doc(`${event.target.id},${localStorage.getItem('user')}`)
    .set({name:`${event.target.id},${localStorage.getItem('user')}`})
	}

	componentDidMount() {
    db.collection('user').onSnapshot(docs => {
      const users = []
      docs.forEach(doc => {
        if (doc.data().email != localStorage.getItem('user')) {
            users.push(doc.data())
        }
      })
      this.props.updateFromDb(users)
    })
  }
	render() {
		return (
			<div>
				<Container>
          {
            this.props.users.map((user, index) => {
              console.log(user.email);
              return(
                <UserCard
                  key={index}
                  id={user.email}
                  image = {user.image_url}
                  userName = {user.userName}
                  onClick={this.handleClick} />
              )
            })
          }

				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.users
})
const mapDispatchToProps = dispatch => ({
	updateFromDb: newdata => dispatch(updateFromDb(newdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
