import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Image, Input, Button } from 'semantic-ui-react'

import fire from "../fire"
import { updateChatRoomFromDb } from "../actions"
import ChatRoomCard from "./chatRoomCard"
import ChatInput from "./inputChat"
import ChatList from "./chatList"

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 30px 10px 20px;
`
const InputContainer = styled.div`
  display:flex;
  width:100%;
  flex-direction:row;
  height:50px;
`

const UserHeader = styled.div`
	height:60px;
	width:100%;
	display:flex;
	flex-direction:row;
	justify-content:center;
	padding:10px 20px;
`
const Header = styled.div`
	height:60px;
	width:100%;
	background:#75B1C7;
	justify-content:center;
	align-items:center;
	padding:10px 20px;
`
// const ChatList = styled.div`
// 	width:100%;
// 	height: 50%;
// 	background:#75B1C7;
// 	justify-content:center;
// 	align-items:center;
// 	padding:10px 20px;
// `
const Title = styled.h3`
	font-size : 30;
	margin:0
`

const db = fire.firestore()
class MainChat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			members:[],
			selectedRoom:'',
			chat:''
		}

	}

	onEnter = event => {
		if (event.key === 'Enter') {
			this.handleClick()
		}
	}

	handleClick = () => {
		console.log(localStorage.getItem('user'));
		const user = this.state.members.filter(member => member.email === localStorage.getItem('user'))
		console.log(this.state.members);
		const data = {
			userName : user[0].userName,
			image_url : user[0].image_url,
			email:user[0].email,
			chat:this.state.chat,
			createdAt: new Date()
		}
		if (user.lenght !== 0) {
			db.collection('chatRoom')
			.doc(this.props.selectedRoom)
			.collection('chat').doc().set(data)
		}
	}


	getUserInfo = () => {
		if (this.props.selectedRoom !== '') {
				const newmembers=[]
				this.props.selectedRoom.split(",").forEach(id => {
					newmembers.push(
						new Promise((res,rej) => {
							db.collection('user').doc(id)
							.get().then(user => {
								res(user.data())
							})
						})
					)
				})
				Promise.all(newmembers).then(data => {
					this.setState({
						members:data
					})
				})

		}
	}

	render() {
		this.getUserInfo()
      return (
        <div>
          <Container>
						<Header>
							<Title>Current chat</Title>
						</Header>
						{this.props.selectedRoom !== '' ? (
								<UserHeader>
								{
									this.state.members.map((member,index) => (
										<Image key={index} id = {this.props.id} width={50} height="50" src={member.image_url} shape='circular'/>
									))
								}
							</UserHeader>) :
							(<p>no chat room selected</p>)
						}
						{this.props.selectedRoom !== '' ? (
							<ChatList selectedRoom={this.props.selectedRoom }/>
						) :
							(<p>no chat room selected</p>)
						}
						<InputContainer>
				        <Input placeholder='chat..' fluid
									onKeyPress = {this.onEnter}
									onChange = {(event) => { this.setState({chat:event.target.value}) }}
									style={{width:'80%'}}/>
				        <Button primary style={{flex:2}} onClick = {this.handleClick}>send</Button>
				    </InputContainer>
          </Container>
        </div>
      )


	}
}

MainChat.defaultProps = {
	selectedRoom:'isyana2@mail.com,hepiska@mail.com'
}
// const mapStateToProps = state => ({
// 	selectedRoom: state.selectedRoom
// })
const mapDispatchToProps = dispatch => ({
	updateChatRoomFromDb: newdata => dispatch(updateChatRoomFromDb(newdata))
})

export default connect(null, mapDispatchToProps)(MainChat)
