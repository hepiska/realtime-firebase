import React,{Component} from 'react'
import styled from "styled-components"
import { Image } from 'semantic-ui-react'
import fire from '../fire'

const Container = styled.div`
  height:100px;
  display:flex;
  width:100%;
  flex-direction:column;
  align-items: center;
  cursor:pointer;
  border-width:1px;
  border-style: solid;
  border-color:grey;
  margin-buttom:10px;
`

const ImageContainer =styled.div`
  height:50px;
  width:50px;
  margin-right:10px;
`
const Title = styled.div`
  height:30px;
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  background:grey;

`
const ImageList = styled.div`
  height:60px;
  width:100%;
  display:flex;
  flex-direction:row;
  padding:10px 20px;

`
const db = fire.firestore()
class ChatRoomCard extends  Component {
  constructor(props){
    super(props)
    this.state = {
      members:[],
    }
  }
  componentWillMount(){
    console.log('this.props.id');
    this.props.id.split(",").forEach(id => {
      db.collection('user').doc(id)
      .get().then(user => {
        console.log(user.exists);
        if (user.exists) {
          const newmembers = [...this.state.members,user.data()]
          this.setState({
            members:newmembers
          })
        }
      })
    })
  }
  render() {
    const {members} = this.state
    if (members.length > 0) {
      return (
        <Container id = {this.props.id} onClick = {this.props.onClick}>
          <Title id = {this.props.id}>
            {members.map((member,index) => (
              <p style={{margin:0}}key={index}>{member.userName},</p>
            ))}
          </Title>
          <ImageList id = {this.props.id}>
            {members.map((member,index) => (
              <ImageContainer key={index} id = {this.props.id}>
                <Image id = {this.props.id} width={50} height="50" src={member.image_url} shape='circular'/>
              </ImageContainer>
            ))}

          </ImageList>

        </Container>
      )
    }else {
      return <p>loading.....</p>
    }

  }
}


export default ChatRoomCard
