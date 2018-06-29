import React from "react";
import DeleteBtn from "./DeleteBtn";
import Col from "./Grid/Col";
import API from "../utils/Api";
deleteArticle = id => {
	API.delete(id)
		.then(res => console.log(res))
		.catch(err => console.log(err));
	  
};
const Saved = props => (
	<Col>
	<p>{props.date}</p>
	<a href={props.url} target="_blank">{props.title}</a>
	<DeleteBtn onClick={() => this.deleteArticle(props._id)}/>
	</Col>
	
);
 
export default Saved;
