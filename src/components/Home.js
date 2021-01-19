import React from 'react';
import Header from './Header.js';
import NamesContainer from './NamesContainer';
import './Home.css';

class Home extends React.Component {

  state = {
    stocks: [
      "BTC", "XRP", "NAS.OL", "PLTR", "GOOG" 
    ],
    searchTerm: ''
  }

  editSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  dynamicSearch = () => {
    return this.state.stocks.filter(stock => stock.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  render() {
    return (
        <div className="App">
          <Header/>
          <div className="content" style = {{textAlign: 'center', paddingTop: '30vh'}}>
              <input type= 'text' value = {this.state.searchTerm} onChange = {this.editSearchTerm} placeholder = 'Search for a stock!'/>
              <br></br>
              <h3>These are some important stocks:</h3>
              <NamesContainer names = {this.dynamicSearch()}/>
          </div>
        </div>
    );
  }
}

export default Home;