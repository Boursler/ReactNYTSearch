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
  API.getArticles(URL).then(res => this.setState({articles: res.data})).catch((err => console.log(err)));
}
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      
        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
     
        queryURL += "?api-key=96a79146affc4bf0ba7a2dc151799e38";
      
        // grab text the user typed into the search input, add as parameter to url
        let searchTerm = this.state.title.val().trim();
        const searchList = searchTerm.split(" ").join("+");
        queryURL += "&q=" + searchList;
      
        // if the user provides a startYear, include it in the queryURL
        const startYear = this.state.startYear.val().trim();
      
        if (parseInt(startYear)) {
          queryURL += "&begin_date=" + startYear + "0101";
        }
      
        // if the user provides an endYear, include it in the queryURL
        var endYear = this.state.endYear.val().trim();
      
        if (parseInt(endYear)) {
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
                // onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.yearStart}
                // onChange={this.handleInputChange}
                name="year_start"
                placeholder="Year Start"
              />
              <Input
                value={this.state.yearEnd}
                // onChange={this.handleInputChange}
                name="year_end"
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
              <h1>Articles on My List</h1>
            </Jumbotron>
            {/* {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
