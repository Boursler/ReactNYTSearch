import axios from "axios";

export default{
	getArticles: function(queryURL){
		return axios.get(queryURL);
	},
	save: function(articleData){
		return axios.post("/api/articles", articleData)
	}, 
	delete: function(id){
		return axios.delete("/api/articles" + id);
	}, 
	getSaved: function(){
		return axios.get("/api/articles");
	}


};
