import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

export class Menu extends Component {

  render() {
    return (
      <ul>
        <li><NavLink to='/register'>Register</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/save-location'>Save Location</NavLink></li>
        <li><NavLink to='/'>Previous Locations</NavLink></li>
      </ul>
    )
  }
}

export class BaseLayout extends Component {
  render() {
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    )
  }
}
