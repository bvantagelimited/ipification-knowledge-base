import './footer.less'
import React from 'react'
import './header.less'
import { Link } from 'gatsby'

const Footer = () => (
  <footer className="app--footer">
    <div className="app--footer-content ui container">
      <div className="ui stackable grid">
        
        <div className="three wide column text-center">
          <a
            href="https://ipfication.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © {new Date().getFullYear()} IPification
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
