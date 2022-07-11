import './index.less'
import React, { useEffect } from 'react'
// import { Container, Sidebar } from 'semantic-ui-react'
// import { ReactComponent as UserManualIcon } from '../images/user-manual.svg'
// import { ReactComponent as APIReferenceIcon } from '../images/api-reference.svg'
// import { ReactComponent as InfoIcon } from '../images/information.svg'

// import SearchBar from '../components/search-bar'
// import Layout from '../components/layout'
// import CompanyInformation from '../components/manual-menu'
// import ReferenceMenu from '../components/reference-menu'
// import InfoMenu from '../components/info-menu'
// import Masthead from '../components/masthead'
// import DocContent from '../components/doc-content'
import { navigate } from 'gatsby'

const IndexPage = () => {
  useEffect(() => {
    navigate('/es/faq/');
  }, []);
}

export default IndexPage
