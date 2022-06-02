import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './menu-link.less'


export default class MenuLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    state: PropTypes.object,
    onClick: PropTypes.func
  }
  
  render() {
    const { to, children, ...props } = this.props
    
    if(typeof window !== 'undefined'){
      console.log(((window.location) || {}).pathname, to)
      console.log(((window.location) || {}).pathname.includes(to))
        const isActive = ((window.location) || {}).pathname.includes(to) ? 'current-active' : 'normal'
        const className = (props.className || '') + ' ' + isActive
        return (
          <Link to={to} className={`menu-link ${className}`} {...props}>
          {children}
        </Link>
      )
    }else{
      const className = (props.className || '')
      return (
        <Link to={to} className={`menu-link ${className}`} {...props}>
        {children}
      </Link>
      )
    }
    

    
  }
}
