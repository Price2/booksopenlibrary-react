import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

//Search component
class Search extends React.Component {
    constructor() {
        super()
        this.toggleSearch = this.toggleSearch.bind(this)
        this.state = {
            active: false,
            isLoading: false,
            dropDown: false
        }
    }

// Saves input onChange from the input box and saves in state
    saveInput(e) {
        this.setState({ query: e.target.value })
    }
// on search click uses the query string in state and fetches the search api with that string
    searchFetchAPI() {
        if(this.state.query || this.state.query.trim()) //validates empty strings or white spaces 
        {
        fetch(`http://openlibrary.org/search.json?q=${this.state.query}`)
            .then(data => {
                this.setState({ isLoading: true }); //isLoading state for rendering loading spinner animation
                return data.json()
            })
            .then(json => {
                this.setState({ searchResults: json });
                this.setState({ isLoading: false });
                return
            })
        }
    }

    //Search button to switch search on/off
    toggleSearch() {
        this.setState({ active: !this.state.active });
        this.setState({ searchResults: null })
    }

    
    render() {
        // State managed by fetch api to render the loading spinner
        if (this.state.isLoading) {
            return (
                <>

                    <button className="openBtn" onClick={this.toggleSearch}><i className="fa fa-plus"></i></button>
                    <div id="myOverlay" className={this.state.active ? 'overlay d-block' : 'overlay d-none'}>
                        <div className="overlay-content">
                            <button onClick={this.toggleSearch} type="submit"><i className="fa fa-arrow-left fa-lg"></i></button>
                            <input onChange={(e) => this.saveInput(e)} type="text" placeholder="Search.." name="search" />
                            <button onClick={() => this.searchFetchAPI()} type="submit"><i className="fa fa-search"></i></button>
                        </div>
                        <div className="spinner-border loading-screen" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <>
                <button className="openBtn" onClick={this.toggleSearch}><i className="fa fa-plus"></i></button>
                <div id="myOverlay" className={this.state.active ? 'overlay d-block' : 'overlay d-none'}>
                    <div className="overlay-content">
                        <button onClick={this.toggleSearch} type="submit"><i className="search fa fa-arrow-left fa-lg"></i></button>
                        <input onChange={(e) => this.saveInput(e)} type="text" placeholder="Search.." name="search" />
                        <button onClick={() => this.searchFetchAPI()} type="submit"><i className="search fa fa-search"></i></button>
                    </div>
                    <div className='container'>
                        <div id='books-wrapper' className='row'>
                            {this.state.searchResults ? this.state.searchResults.docs.map((results, idx) => {
                                if (!results.cover_i || !results.title || !results.author_name) {
                                    return "";
                                }
                                else {
                                    return (
                                        <div key={idx} className='col-md-3'>
                                            <div className='img-wrapper'>
                                                <img className='w-100' src={"https://covers.openlibrary.org/b/id/" + results.cover_i + "-M.jpg"} alt="book-cover" />
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu >
                                                            <Dropdown.Item onClick={()=> this.props.wantToRead(results)} href="">Want To Read</Dropdown.Item>
                                                            <Dropdown.Item onClick={()=> this.props.read(results)} href="">Read</Dropdown.Item>
                                                            <Dropdown.Item onClick={()=> this.props.currentlyReading(results)} href="">Currently Reading</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                            </div>
                                            <h5>{results.title}</h5>
                                            <h6 >{results.author_name}</h6>
                                        </div>

                                    )
                                }


                            }) : ''}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Search