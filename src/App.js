import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import Search from './components/Search';
import Currentlyreading from './components/Currentlyreading'
import WantToRead from './components/WantToRead';
import Read from './components/Read';

class App extends React.Component {

  constructor() { // construct my app parent state with what's in storage, if empty then set with empty array
    super();
    this.state = {
      wantToRead: localStorage.getItem("wantToRead") ? JSON.parse(localStorage.getItem("wantToRead")) : [],
      read: localStorage.getItem("Read") ? JSON.parse(localStorage.getItem("Read")) : [],
      currentlyReading: localStorage.getItem("currentlyReading") ? JSON.parse(localStorage.getItem("currentlyReading")) : []

    }
  }

//Save functions which is passed as callbackfn props to children components to save books
  saveWantToRead(book) { 

    // Helper functions to filter,save states and save in storage
    this.filterBooks(book)
    this.state.wantToRead.push(book)
    this.saveBookState()
    this.saveBookStorage()


  }

  saveRead(book) {
    this.filterBooks(book)
    this.state.read.push(book)
    this.saveBookState()
    this.saveBookStorage()

  }

  saveCurrentlyReading(book) {
    this.filterBooks(book)
    this.state.currentlyReading.push(book)
    this.saveBookState()
    this.saveBookStorage()


  }

  filterArray(array, obj) {
    return array.filter((book) => book.key !== obj.key)
  }

  filterBooks(book) {

    if (this.state.wantToRead.length || this.state.read.length || this.state.currentlyReading.length) {
      this.state.wantToRead = this.filterArray(this.state.wantToRead, book)
      this.state.read = this.filterArray(this.state.read, book)
      this.state.currentlyReading = this.filterArray(this.state.currentlyReading, book)
    }

  }

  saveBookState() {
    this.setState({ wantToRead: this.state.wantToRead, read: this.state.read, currentlyReading: this.state.currentlyReading })
  }
  saveBookStorage() {
    localStorage.setItem('wantToRead', JSON.stringify(this.state.wantToRead))
    localStorage.setItem('Read', JSON.stringify(this.state.read))
    localStorage.setItem('currentlyReading', JSON.stringify(this.state.currentlyReading))
  }




  render() {
    return (
      <>
        <div id='page-title'>
          <div className='container'>
            <h3 className='text-center text-white'>My Reads</h3>
          </div>
        </div>
        <Read readState={this.state.read} wantToRead={this.saveWantToRead.bind(this)} currentlyReading={this.saveCurrentlyReading.bind(this)} />
        <Currentlyreading currentlyReadingState={this.state.currentlyReading} read={this.saveRead.bind(this)} wantToRead={this.saveWantToRead.bind(this)} />
        <WantToRead wantToReadState={this.state.wantToRead} read={this.saveRead.bind(this)} currentlyReading={this.saveCurrentlyReading.bind(this)} />
        <Search read={this.saveRead.bind(this)} currentlyReading={this.saveCurrentlyReading.bind(this)} wantToRead={this.saveWantToRead.bind(this)} />
      </>
    )
  }
}

export default App;
