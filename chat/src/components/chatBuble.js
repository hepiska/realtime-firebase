import React,{Component} from 'react'
import { Image } from 'semantic-ui-react'

const ChatBuble = props => {
  if (props.data.email !== localStorage.getItem('user')) {
    return(
    <div style={{display:"flex", flexDirection:"row", flex:1,width:'70%',margin:'10px' }}>
      <div style={{flex:1}}>
        <Image width={50} height="50" src={props.data.image_url} shape='circular'/>
      </div>
      <div style={{flex:4,flexDirection:'column'}}>
        <div style={{flex:2}}>
          {props.data.userName}
        </div>
        <div style={{flex:3}}>
          {props.data.chat}
        </div>
      </div>
    </div>
  )
  }else{
    return(
    <div style={{display:"flex", flexDirection:"row",flex:1,width:'100%',margin:'10px' }}>
      <div style={{flex:4,flexDirection:'column'}}>
        <div style={{flex:2}}>
          {props.data.userName}
        </div>
        <div style={{flex:3}}>
          {props.data.chat}
        </div>
      </div>
      <div style={{flex:1}}>
        <Image  width={50} height="50" src={props.data.image_url} shape='circular'/>
      </div>
    </div>
  )
  }
}

export default ChatBuble
