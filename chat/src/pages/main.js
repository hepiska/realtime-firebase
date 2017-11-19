import React, { Component } from "react"
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom"
import styled from "styled-components"

import fire from '../fire'
import { updateFromDb,updateChatRoomFromDb } from '../actions'
import Header from '../components/header'
import UserList from '../components/userList'
import MainChat from '../components/mainChat'
import ChatRoomList from '../components/chatRoomList'

const Container = styled.div`
	display:flex;
	width:100%;
	flex-direction:row;
	justify-content:'space-between'
`

const SideContainer = styled.div`
flex:1
`
const CenterContainer = styled.div`
flex:2
`


const db = fire.firestore()
class MainPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedRoom:''
		}
	}

	// getSelectedRoom(room){
	// 	console.log(room);
	// 	// MainPage.setState({selectedRoom:room})
	// }
	getSelectedRoom = event => {
		this.setState({selectedRoom:event.target.id})
	}
	componentWillMount(){
		db.collection('chatRoom').onSnapshot(docs => {
			const chatRooms = []
			docs.forEach(doc => {
					chatRooms.push(doc.data())
			})
			this.props.updateChatRoomFromDb(chatRooms)
			console.log('ChatRooms',chatRooms);
		})
	}
	render() {
		console.log(this.state.selectedRoom);
		if (localStorage.getItem('user')) {
			return (
				<div>
					<Header/>
					<Container>
						<SideContainer>
							<ChatRoomList
								handleClick={ this.getSelectedRoom }
								chatRooms={this.props.chatRooms}/>
						</SideContainer>
						<CenterContainer>
							<MainChat selectedRoom = {this.state.selectedRoom }/>
						</CenterContainer>
						<SideContainer>
							<UserList/>
						</SideContainer>
					</Container>
				</div>
			)
		}else {
			return (
				<Redirect to={{
					pathname: '/login',
				}}/>
			)
		}

	}
}

const mapStateToProps = state => ({
	users : state.users,
	chatRooms: state.chatrooms
})
const mapDispatchToProps = dispatch => ({
	updateFromDb:(newdata) => dispatch( updateFromDb(newdata) ),
	updateChatRoomFromDb: newdata => dispatch(updateChatRoomFromDb(newdata)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
