import React from "react";
import DeleteBtn from "./DeleteBtn";
import {Col} from "./Grid";
// import API from "../utils/Api";
 
const Saved = props => (
	<Col size="md-6">
	<p>{props.date}</p>
	<a href={props.url} target="_blank">{props.title}</a>
	<DeleteBtn onClick={() => this.deleteArticle(props._id)}/>
	</Col>
	
);
 
export default Saved;
