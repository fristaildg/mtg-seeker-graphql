import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import CardGrid from './components/CardGrid';
import Card from './components/Card';

class App extends Component {
  state = {
    cardData: []
  }

  handleCardData = (data, lastCursor) => {
    this.setState({cardData: data});
  }

  render() {
    const {cardData} = this.state;

    return (
      <div className="App">
        <Header/>
        <SearchForm onFetchCardData={this.handleCardData}/>
        {
          cardData.length <= 0 ? (
            <p>
              Search for a Card!
            </p>
          ) : (
            <CardGrid>
              {
                cardData.map(data => {
                  return (
                    <Card data={data.node} key={data.node.id}/>
                  )
                })
              }
            </CardGrid>
          )
        }
      </div>
    );
  }
}

export default App;
