import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Button } from 'semantic-ui-react'

import fire from "../fire"
import { updateFromDb } from "../actions"
import UserCard from "./userCard"

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	min-height: 300px;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 30px 10px 20px;
`
const ListContainer = styled.div`
	display: flex;
	flex: 3;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	-webkit-scrollbar {
    display: none;
}
`
const SelectedContainer = styled.div`
	flex: 2;
	display:flex;
	width:360px;
	flex-direction: row;
	overflow-x:auto;
	justify-content: flex-start;
	align-items: flex-start;
`

const db = fire.firestore()
class UserList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedUsers: []
		}
	}

	handleClick = event => {
		const newSelectedUser = this.state.selectedUsers
		if (newSelectedUser.findIndex(user => user.email == event.target.id) === -1) {
			const user = this.props.users.filter(user => user.email === event.target.id)
			newSelectedUser.push(user[0])
			this.setState({selectedUsers: newSelectedUser })
		}
		// db.collection('chatRoom')
    // .doc(`${event.target.id},${localStorage.getItem('user')}`)
    // .set({name:`${event.target.id},${localStorage.getItem('user')}`})
	}

	createRoom = () =>{
		const NewRoom = [localStorage.getItem('user')]
		this.state.selectedUsers.forEach(user => {
			NewRoom.push(user.email)
		})
		db.collection('chatRoom')
		.doc(NewRoom.join(','))
		.set({name:NewRoom.join(',')})
		this.setState({selectedUsers:[]})
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
					<ListContainer>
          {
            this.props.users.map((user, index) => {
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
				</ListContainer>
				<SelectedContainer >
					{
						this.state.selectedUsers.map((user, index) => {
							return(
								<UserCard
									key={index}
									image = {user.image_url}/>
							)
						})
					}
				</SelectedContainer>
				<Button onClick = { this.createRoom }> create room</Button>
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
