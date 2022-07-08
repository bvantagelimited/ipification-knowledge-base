import './index.less'
import React, { useEffect } from 'react'

import { navigate } from 'gatsby'

const IndexPage = () => {
  useEffect(() => {
    navigate('/en/company-profile/');
  }, []);
}

export default IndexPage
