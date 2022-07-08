module.exports = {
  pathPrefix: `/knowledge-base`,
  // trailingSlash: `never`,
  siteMetadata: {
    title: `IPification Documentation`,
    description: `IPification`,
    author: `@tn`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `release-pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                table: 'ui celled small table'
              }
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 600,
              quality: 100,
              // wrapperStyle: 'margin-left: 0px'
            }
          }
        ]
      }
    },
    // {
    //   resolve: 'gatsby-plugin-fathom',
    //   options: {
    //     siteId: 'GKTOOZAA',
    //     honorDnt: true
    //   }
    // },
    'gatsby-plugin-svgr'
  ]
}
