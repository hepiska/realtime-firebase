import React from 'react'
import styled from "styled-components"
import { Image } from 'semantic-ui-react'

const Container = styled.div`
  height:60px;
  display:flex;
  width:100%;
  flex-direction:row;
  align-items: center;
  cursor:pointer;
`

const ImageContainer =styled.div`
  height:50px;
  width:50px;
  margin-right:20px;
`
const Tittle = styled.h3`
  font-size:'20px';
  margin:0;
`

const UserCard = (props) => (
  <Container id = {props.id} onClick = {props.onClick}>
    <ImageContainer>
    <Image id = {props.id} src ={props.image} height={50} width={50} shape='circular'/>
    </ImageContainer>
    <Tittle id = {props.id} >{ props.userName }</Tittle>
  </Container>
)

export default UserCard
