import React from 'react'
import { Link } from 'react-router-dom'

const Onloadpage = () => {
  return (
      <div className="container text-center p-5" style={{"height":"85vh"}}>
	<h1>Tame your work, organize your life</h1>
	<h4>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h4>
	
	<Link className="btn btn-primary mx-1" to="/signup"
					role="button" style={{"background-color":"green",width:"15rem", "margin-top":"2rem","margin-bottom":"1rem"}}> Sign up for free </Link>
					<br/>
	<Link className="mx-1 " to="/login" role="button" style={{"font-size":"20px"}}>
					Already have an account? Log in  </Link> 
	</div>
    
  )
}

export default Onloadpage
