import React, { Component } from "react";
import DeleteBtn from "./DeleteBtn";
import Jumbotron from "./Jumbotron";
import API from "../utils/Api";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "./Grid";
import { List, ListItem } from "./List";
import { Input, TextArea, FormBtn } from "./Form";

class Home extends Component {
  state = {
    articles: [],
    title: "",
    yearStart: "",
    yearEnd: "",
    url: ""
  };

//   componentDidMount() {
//     this.loadBooks();
//   }

//   loadBooks = () => {
//     API.getBooks()
//       .then(res =>
//         this.setState({ books: res.data, title: "", author: "", synopsis: "" })
//       )
//       .catch(err => console.log(err));
//   };

//   deleteBook = id => {
//     API.deleteBook(id)
//       .then(res => this.loadBooks())
//       .catch(err => console.log(err));
//   };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };
loadRes = URL => {
  API.getArticles(URL).then(res => {
    console.log(res.data.response.docs);
    this.setState({articles: res.data.response.docs})}).catch((err => console.log(err)));
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
                    <a href={article.web_url} target="_blank">
                      <strong>
                        {article.headline.main}
                      </strong>
                    </a>
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
