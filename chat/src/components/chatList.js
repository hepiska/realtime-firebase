import React, { Component } from "react"
import styled from "styled-components"
import { Image, Input, Button,Card } from 'semantic-ui-react'

import fire from "../fire"
import ChatBuble from "./chatBuble"

const db = fire.firestore()
class ChatList extends Component {
  constructor(props){
    super(props)
    this.state={
      chats:[]
    }
  }
  componentWillMount(){
      db.collection('chatRoom')
      .doc(this.props.selectedRoom)
      .collection('chat').orderBy('createdAt','asc')
      .onSnapshot(docs => {
        const newChats = []
          docs.forEach( doc => {
            newChats.push(doc.data())
          })
          this.setState({chats:newChats})
      })
  }
  render(){
    return(
    <div style={{display:'flex',width:'100%',flexDirection:'column'}}>
      {
        this.state.chats.map((chat,index) => {
          return (
            <ChatBuble data={chat} key={index} />
          )
        })
      }
    </div>

    )
  }
}


export default ChatList
