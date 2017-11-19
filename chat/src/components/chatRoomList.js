import React, { Component } from "react"
import styled from "styled-components"
import ChatRoomCard from "./chatRoomCard"

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 30px 10px 20px;
`

const ChatRoomList = props => {
	if (props.chatRooms && props.chatRooms.length > 0) {
		return(
			<Container>
				{
					props.chatRooms.map((chatRoom, index) => {
						return(
							<ChatRoomCard
								key={index}
								id={chatRoom.name}
								users = {chatRoom.users}
								onClick={props.handleClick} />
						)
					})
				}
			</Container>
		)
	} else {
		return(<p>loading.......</p>)
	}
}

export default ChatRoomList
