import React, {Component} from 'react';

export class SaveLocation extends Component {
  constructor() {
    super()

    this.state= {
      latitude: 0.0,
      longitude: 0.0,
      message: ''
    }
  }

  handleSaveLocationClick = () => {
    fetch('http://localhost:8080/api/save-location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude: this.state.latitude,
      longitude: this.state.longitude
    })
  }).then(response => response.json())
  .then(result => {
    if(result.sucess) {
      this.setState({
        message: result.message
      })
    }
  })

  }

  componentDidMount() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude:position.coords.longitude
        })
      })
    }
  }

  render() {
    return (
      <div>
      <button onClick={this.handleSaveLocationClick}>Get Location</button>
      <label>{this.state.message}</label>
      </div>
    )
  }
}
