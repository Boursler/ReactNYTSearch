import axios from "axios";

export default{
	getArticles: function(queryURL){
		return axios.get(queryURL);
	}


}