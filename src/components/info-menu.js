import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuLink from './menu-link'
import { StaticQuery, graphql } from 'gatsby'
import Menu from './menu'

export default class InfoMenu extends Component {
  static propTypes = {
    sideMenu: PropTypes.bool
  }

  render() {
    var isEn = true
    if(typeof window !== 'undefined'){
      isEn = ((window.location) || {}).pathname.includes("/es/") ? false: true
    }
    return (
      <StaticQuery
        query={isEn ? menuQuery : menuQuery}
        render={data => {
          var lData = isEn ? data.en : data.es
          const pages = [
            ...lData.edges.map(edge => ({
              path: edge.node.frontmatter.path,
              title: edge.node.frontmatter.title
            }))
          ]

          return (
            <Menu className="manual-menu">
              {/* <h3 className="ui header">
                <i className="info icon" />
                <div className="content">FAQ</div>
              </h3> */}
              <ul className="article-list">
                {pages.map(page => {
                  // console.log(page)
                  const { path, href, title } = page
                  return path ? (
                    <li key={path}>
                      <MenuLink to={path}>{title}</MenuLink>
                    </li>
                  ) : (
                    <li key={href}>
                      <MenuLink to={href}>{title}</MenuLink>
                    </li>
                  )
                })}
              </ul>
            </Menu>
          )
        }}
      />
    )
  }
}

const menuQuery = graphql`
  query {
    en : allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___index] }
      limit: 1000
      filter: { frontmatter: { category: { eq: "info" }, path: {regex: "/en//"} } }
    ) {
      edges {
        node {
          frontmatter {
            index
            path
            title
          }
        }
      }
    }, 

    es: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___index] }
      limit: 1000
      filter: { frontmatter: { category: { eq: "info" }, path: {regex: "/es//"} } }
    ) {
      edges {
        node {
          frontmatter {
            index
            path
            title
          }
        }
      }
    }
  }
`


