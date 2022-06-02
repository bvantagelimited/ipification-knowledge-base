import { Link } from 'gatsby'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as DocumentationIcon } from '../images/documentation.svg'
import { ReactComponent as ForumIcon } from '../images/forum.svg'
import './masthead.less'

export default class Masthead extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div >
        {/* <div className="ui text container">
          
         

         
          {this.props.children}
        </div> */}
      </div>
    )
  }
}
