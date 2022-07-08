import './breadcrumb.less'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export default class Breadcrumb extends Component {
  static propTypes = {
    currentPageTitle: PropTypes.string.isRequired,
    middleLevel: PropTypes.object
  }

  render() {
    var isEn = true
    if(typeof window !== 'undefined'){
      isEn = ((window.location) || {}).pathname.includes("/es/") ? false: true
    }

    const { currentPageTitle, middleLevel } = this.props
    return (
      <div className="app--breadcrumb">
        <div className="ui container">
          <div className="ui breadcrumb">
            <Link to={isEn ? "/" : "/es"} className="section">
              <i className="home icon" />
              Docs
            </Link>
            {/* <i className="right chevron icon divider" /> */}
            {/* <Link to={middleLevel.to} className="section">
              {middleLevel.label}
            </Link> */}
            <i className="right chevron icon divider" />
            <div className="active section">{currentPageTitle}</div>
            
          </div>
        </div>
      </div>
    )
  }
}
