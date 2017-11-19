import React,{Component} from "react"
import styled from "styled-components"
import {  Button } from "semantic-ui-react"
import { Redirect,Link } from "react-router-dom"
import fire from '../fire'

const Wraper = styled.div`
	width: 100%;
	height: 80px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  color:white;
  padding: 10px 50px 10px 50px;
`
const Tittle = styled.h2`
  color: grey;
  font-size: 20;
  margin:0;
`

class  Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			update:true
		}
	}

	logout = () => {
	  fire.auth().signOut().then(()=>{
	  })
		localStorage.removeItem('user')
		this.setState({update:!this.state.update})
	}

	render(){
		return(	<Wraper>
		    <Tittle>firechat</Tittle>
		    { localStorage.getItem('user') ? (
		      <div>
		        <Button color='red' onClick={this.logout}>logout</Button>
		      </div>
		    ):(
		      <div>
		        <Button primary>login</Button>
		        <Link to="/register"><Button color='olive'>register</Button></Link>
		      </div>
		    )}
			</Wraper>)
	}
}

export default Header
