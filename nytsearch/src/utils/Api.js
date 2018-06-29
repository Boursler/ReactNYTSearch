import axios from "axios";

export default{
	getArticles: function(queryURL){
		return axios.get(queryURL);
	},
	save: function(articleData){
		return axios.post("/api/saved", articleData)
	}


};
