import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import fire from "../fire"
import { updateChatRoomFromDb, selectroom } from "../actions"
import ChatRoomCard from "./chatRoomCard"

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 30px 10px 20px;
`
const db = fire.firestore()
class ChatRoomList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			number: ""
		}
	}

	// handleClick = event => {
  //   this.props.selectroom(event.target.id)
	// }

	componentWillMount() {
    db.collection('chatRoom').onSnapshot(docs => {
      const chatRooms = []
      docs.forEach(doc => {
        const users = []
          chatRooms.push(doc.data())
      })
      this.props.updateChatRoomFromDb(chatRooms)
      console.log('ChatRooms',chatRooms);
    })
  }

	render() {
    if (this.props.chatRooms) {
      return (
        <div>
          <Container>
            {
              this.props.chatRooms.map((chatRoom, index) => {
                return(
                  <ChatRoomCard
                    key={index}
                    id={chatRoom.name}
                    users = {chatRoom.users}
                    onClick={this.handleClick} />
                )
              })
            }
          </Container>
        </div>
      )
    }else {
      return(<p>loading.......</p>)
    }

	}
}

const mapStateToProps = state => ({
	chatRooms: state.chatrooms
})
const mapDispatchToProps = dispatch => ({
	updateChatRoomFromDb: newdata => dispatch(updateChatRoomFromDb(newdata)),
  selectroom:roomId => dispatch(selectroom(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomList)
