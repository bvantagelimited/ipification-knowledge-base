import { StaticQuery, graphql, Link } from 'gatsby'
import { Container } from 'semantic-ui-react'
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import './navigation.less'

const Navigation = () => {
  var isEn = true
  if(typeof window !== 'undefined'){
    isEn = ((window.location) || {}).pathname.includes("/es/") ? false: true
  }
  return <Container className="app--navigation">
    <nav className="ui grid">
      <div className="row">
        <Link to="/" className="app--logo">
          <StaticQuery
            query={graphql`
              query {
                placeholderImage: file(
                  relativePath: { eq: "navbar-logo.png" }
                ) {
                  childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 250, height: 45    ,      placeholder: BLURRED
                      )
                  }
                }
              }
            `}
            render={data => (
              <GatsbyImage
                image={data.placeholderImage.childImageSharp.gatsbyImageData}
                alt="logo"
              />
            )}
          />
        </Link>

        <ul className="app--navbar reset-list un-select">
        <li>
          <Link to={"/en"} className="login">
              <i className="en_language" />
              EN
            </Link>
          </li>
          <li>
          <Link to={"/es"} className="login">
              <i className="es_language" />
              ES
            </Link> 
             
          </li> 
          
        </ul>
      </div>
    </nav>
  </Container>
}

export default Navigation
