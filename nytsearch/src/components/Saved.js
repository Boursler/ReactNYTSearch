import React from "react";
import DeleteBtn from "./DeleteBtn";
import {Col} from "./Grid";
import Moment from "moment";
// import API from "../utils/Api";
//  <p>Publication Date: {Moment(article.pub_date).format('MMM Do YY')}</p>
const Saved = props => (
	<Col size="md-6">
	<p>{Moment(props.date).format('MMM Do YY')}</p>
	<a href={props.url} target="_blank">{props.title}</a>
	<DeleteBtn onClick={() => props.deleteArticle(props.id)}/>
	</Col>
	
);
 
export default Saved;
