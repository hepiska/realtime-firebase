import React, { Component } from "react"
import styled from "styled-components"
import { Input, Button } from 'semantic-ui-react'

const Container = styled.div`
  display:flex;
  width:100%;
  flex-direction:row;
  height:50px;
`

const ChatInput = (props) => {
  return(
    <Container>
        <Input placeholder='chat..' fluid style={{width:'80%'}} value= {props.value}/>
        <Button primary style={{flex:2}}>send</Button>
    </Container>
  )
}

export default ChatInput
