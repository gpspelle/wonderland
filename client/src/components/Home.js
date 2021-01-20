import React from 'react';
import Header from './Header.js';
import NamesContainer from './NamesContainer';
import './Home.css';

class Home extends React.Component {

  state = {
    response: '',
    post: '',
    responseToPost: ''
  };
  
  componentDidMount = () => {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  };
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/name-to-ticker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.post }),
    });

    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

  /*state = {
    stocks: [
      "BTC", "XRP", "NAS.OL", "PLTR", "GOOG" 
    ],
    searchTerm: ''
  }*/

  /*editSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  dynamicSearch = () => {
    return this.state.stocks.filter(stock => stock.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }
  */
  render() {
    return (
        <div className="App">
          <Header/>
          <div className="content" style = {{textAlign: 'center', paddingTop: '30vh'}}>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={this.state.post}
                  onChange={e => this.setState({ post: e.target.value })}
                  placeholder="Search for a company"
                />
                <button type="submit">Submit</button>
              </form>
              <br />
              <p>{this.state.responseToPost}</p>
          </div>
        </div>
    );
  }
}

//<NamesContainer names = {this.dynamicSearch()}/>


export default Home;