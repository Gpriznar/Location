import React, {Component} from 'react';
import {PreviousLocationsList} from './components/PreviousLocationsList'
import {SaveLocation} from './components/SaveLocation'
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.state = {
      locationRecords: []
    }
  }

  componentDidMount() {
    let url = 'http://localhost:8080/api/previous-locations'
    fetch(url)
    .then(response => response.json())
    .then(records => {
      this.setState({
        locationRecords: records
      })
    })
  }

  render() {
    return (
      <div>
        <PreviousLocationsList  records = {this.state.locationRecords} />
      </div>
    )
  }

}

export default App;
