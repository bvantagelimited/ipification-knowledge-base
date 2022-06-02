// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import MenuLink from './menu-link'
// import { StaticQuery, graphql } from 'gatsby'
// import Menu from './menu'

// export default class ManualMenu extends Component {
//   static propTypes = {
//     sideMenu: PropTypes.bool
//   }

//   render() {
//     const { sideMenu } = this.props
//     return (
//       <StaticQuery
//         query={menuQuery}
//         render={data => (
//           <Menu className="manual-menu">
//             <div className={sideMenu ? '' : 'ui stackable grid'}>
//               <div className={sideMenu ? '' : 'one column row'}>
                
//                 <div className={sideMenu ? '' : 'column'}>
//                   <h3 className="ui header">
//                     <i className="configure icon" />
//                     <div className="content">Hacking Inkdrop</div>
//                   </h3>
//                   <ul className="article-list">
//                     {data.hackingManual.edges.map(edge => {
//                       const { path, title } = edge.node.frontmatter
//                       return (
//                         <li key={path}>
//                           <MenuLink to={path}>{title}</MenuLink>
//                         </li>
//                       )
//                     })}
//                   </ul>

                  
//                 </div>
//               </div>
//             </div>
//           </Menu>
//         )}
//       />
//     )
//   }
// }

// const menuQuery = graphql`
//   query {
//     usageManual: allMarkdownRemark(
//       sort: { order: ASC, fields: [frontmatter___index] }
//       limit: 1000
//       filter: { frontmatter: { category: { eq: "usage" } } }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             path
//             title
//           }
//         }
//       }
//     }
//     hackingManual: allMarkdownRemark(
//       sort: { order: ASC, fields: [frontmatter___index] }
//       limit: 1000
//       filter: { frontmatter: { category: { eq: "usage" } } }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             path
//             title
//           }
//         }
//       }
//     }
//     appendix: allMarkdownRemark(
//       sort: { order: ASC, fields: [frontmatter___index] }
//       limit: 1000
//       filter: { frontmatter: { category: { eq: "appendix" } } }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             path
//             title
//           }
//         }
//       }
//     }
//   }
// `
