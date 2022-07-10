import React from "react";
import axios from "axios";
import Favorite from "./Favorite";
import { Button } from "reactstrap";

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      Results: {},
      message: "",
      totalResult: 0,
      totalPages: 0,
      currentPageNo: 0,
      favoriteList: [],
    };
    this.cancel = "";
  }

  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  componentDidMount = (updatedPageNo = "", query) => {
    //to get page number
    let pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `/movies/${query}/${pageNumber}`;

    //cancel results if user uses backspace and types in new search
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        //get response of total results
        const total = res.data.resultCount;
        const totalPagesCount = this.getPageCount(total, 20);
        const resultNotFound = !res.data.results.length
          ? "There are no more search results. Please try a new search"
          : "";
        //set state
        this.setState({
          Results: res.data.results,
          message: resultNotFound,
          totalResult: total,
          totalPages: totalPagesCount,
          currentPageNo: updatedPageNo,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    //set state to empty if nothing in query
    if (!query) {
      this.setState({
        query,
        Results: {},
        message: "",
        totalPages: 0,
        totalResult: 0,
      });
    } else {
      this.setState({ query: query, message: "" }, () => {
        this.componentDidMount(1, query);
      });
    }
  };

  //add to favorite
  addToFavorite = (index, previewUrl, trackName, artworkUrl100) => {
    const { favoriteList } = this.state;

    let item = {
      id: index,
      link: previewUrl,
      title: trackName,
      img: artworkUrl100,
    };

    this.setState({ favoriteList: [...favoriteList, item] });

    console.log(favoriteList);
  };

  renderSearchResults = () => {
    const { Results } = this.state;
    //set state for search results
    if (Object.keys(Results).length && Results.length) {
      return (
        <div className="results-container">
          {Results.map((result, index) => {
            return (
              <div className="result-item">
                <a key={index} href={result.previewUrl}>
                  <h6 className="image-username">{result.trackName}</h6>
                  <div className="image-wrapper">
                    <img
                      className="image"
                      src={result.artworkUrl100}
                      alt={result.trackName}
                      s
                    />
                  </div>
                </a>
                <div>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={this.addToFavorite.bind(
                      this,
                      index,
                      result.previewUrl,
                      result.trackName,
                      result.artworkUrl100
                    )}
                  >
                    Add
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  //delete favorite
  handleDelete = (id) => {
    this.setState((prevState) => {
      return {
        favoriteList: prevState.favoriteList.filter((f) => f.id !== id),
      };
    });
  };

  render() {
    const { query, message, favoriteList } = this.state;

    return (
      <div className="container">
        {/* favorites */}
        <Favorite
          favoriteList={favoriteList}
          handleDelete={this.handleDelete}
        />

        {/* heading*/}
        <h2 className="heading">Search Movies</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>

        {/* message */}
        {message && <p className="message"> {message}</p>}

        {/* results */}
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Movies;
