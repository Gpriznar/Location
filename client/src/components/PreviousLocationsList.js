import React, {Component} from 'react'

export class PreviousLocationsList extends Component {

  render() {

    const records = this.props.records
    let recordItems = records.map((record) => {
      return <li key={record.id}>
             <a href={`https://www.latlong.net/c/?lat=${record.latitude}&long=${record.longitude}`}>{record.latitude}, {record.longitude}</a>
             </li>
    })

      return (
        <div>
        <h1>Previous Locations</h1>
        <button>test</button>
        <ul>{recordItems}</ul>
        </div>
      )
  }
}
