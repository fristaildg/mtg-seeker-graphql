import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import CardGrid from './components/CardGrid';
import Card from './components/Card';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const {cardData} = this.props;

    return (
      <div className="App">
        <Header/>
        <SearchForm/>
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

const mapStateToProps = (state) => {
  return {
    cardData: state.cardData
  }
}

export default connect(mapStateToProps)(App);
