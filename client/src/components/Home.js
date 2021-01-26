import React from 'react';
import Header from './Header.js';
import './Home.css';
import Plot from 'react-plotly.js';

class Home extends React.Component {

  state = {
    companyName: '',
    website: '',
    ticker: 'None',
    data: [],
    layout: null
  };

  handleSubmit = async e => {
    e.preventDefault();
    const companyNameToTickerResponse = await fetch('/api/company-name-to-ticker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  companyName: this.state.companyName }),
    });
    
    const companyNameToTickerBody = await companyNameToTickerResponse.json();

    this.setState({ ticker: companyNameToTickerBody.ticker,
                    website: companyNameToTickerBody.website });

    const companyTickerToDataResponse = await fetch('/api/ticker-to-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  ticker: companyNameToTickerBody.ticker }),
    });
    
    const companyTickerToDataBody = await companyTickerToDataResponse.json();

    this.setState({ data: companyTickerToDataBody.data,
                    layout: companyTickerToDataBody.layout });
  };

  render() {
    return (
        <div className="App">
          <Header/>
          <div className="content" style = {{textAlign: 'center', paddingTop: '30vh'}}>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={this.state.companyName}
                  onChange={e => this.setState({ companyName: e.target.value })}
                  placeholder="Search for a company"
                />
                <button type="submit">Submit</button>
              </form>
              <br />
             
              <p>Stock code: {this.state.ticker}</p>
              <a href={this.state.website}>{this.state.website}</a>
              <Plot
                data={this.state.data}
                layout={this.state.layout}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={(figure) => this.setState(figure)}
              />
          </div>
        </div>
    );
  }
}

export default Home;