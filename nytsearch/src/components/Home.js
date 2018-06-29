import React, { Component } from "react";

import Jumbotron from "./Jumbotron";
import API from "../utils/Api";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "./Grid";
import { List, ListItem } from "./List";
import { Input, FormBtn } from "./Form";
import Moment from "moment";
import Saved from "./Saved";

class Home extends Component {
  state = {
    articles: [],
    title: "",
    yearStart: "",
    yearEnd: "",
    url: "",
    savedArticles: []
  };

  componentDidMount() {
    this.loadSaved();
  }

loadRes = URL => {
  API.getArticles(URL).then(res => {
    console.log(res.data.response.docs);
    this.setState({articles: res.data.response.docs})}).catch((err => console.log(err)));
}

saveArticle = (headline, url, pub_date) => {
  // event.preventDefault();
  if(pub_date !== ""){
    API.save({headline: headline, url: url, pub_date: pub_date}).then(res => this.loadSaved())
   .catch(err => console.log(err));
  }
  else {
    API.save({headline: headline, url: url}).then(res=> this.loadSaved()).catch(err => console.log(err));
  }

}
loadSaved(){
  API.getSaved().then(response => this.setState({savedArticles: response})).catch((err => console.log(err)));

}
handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      
        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
     
        queryURL += "?api-key=96a79146affc4bf0ba7a2dc151799e38";
      
        // grab text the user typed into the search input, add as parameter to url
        let searchTerm = this.state.title;
        const searchList = searchTerm.split(" ").join("+");
        queryURL += "&q=" + searchList;
      
        // if the user provides a startYear, include it in the queryURL
        console.log("start year type", typeof(this.state.yearStart));
       if(parseInt(this.state.yearStart)){
        const startYear = this.state.yearStart;
      
        
          queryURL += "&begin_date=" + startYear + "0101";
       }
        
      if(parseInt(this.state.yearEnd)){
        // if the user provides an endYear, include it in the queryURL
        const endYear = this.state.yearEnd;
      
        
          queryURL += "&end_date=" + endYear + "0101";
        }
      
        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        this.loadRes(queryURL);
        return queryURL;
     
      };
    };
  

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Articles Main page</h1>
			  <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.yearStart}
                onChange={this.handleInputChange}
                name="yearStart"
                placeholder="Year Start"
              />
              <Input
                value={this.state.yearEnd}
                onChange={this.handleInputChange}
                name="yearEnd"
                placeholder="Year End"
              />
			 
              <FormBtn
                // disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
            </Jumbotron>
            
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Searched Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id} >
                 {article.pub_date ? (<p>Publication Date: {Moment(article.pub_date).format('MMM Do YY')}</p>) :
                 (<p></p>)}
                    <a href={article.web_url} target="_blank">
                      <strong>
                        {article.headline.main}
                      </strong>
                    </a>
                    <FormBtn onClick={e => {
                      e.preventDefault();
                      return article.pub_date ? (this.saveArticle(article.headline.main, article.web_url, article.pub_date)) : (this.saveArticle(article.headline.main, article.web_url, ""))}}>Save</FormBtn>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <h2>Saved Articles</h2>
{(this.state.savedArticles.length) ? (
  <Row>
    
  <List>
    {this.state.savedArticles.map(savedArticle => (
      <ListItem key = {savedArticle._id} >
      {(savedArticle.pub_date) ? (<Saved 
        id= {savedArticle._id}
        title={savedArticle.title}
        url={savedArticle.url}
        date={savedArticle.pub_date}

      />) : (<Saved id={savedArticle._id}
          title={savedArticle.title}
          url={savedArticle.url}
          date={""}
        />)}
      
      </ListItem>
    ))}
    </List>
   
    </Row>
) : (<h3>No Saved Articles</h3>)}
      </Container>
    );
  }
}

export default Home;
