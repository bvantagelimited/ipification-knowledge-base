module.exports = {
  pathPrefix: `/knowledge-base`,

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
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/company-profile`,
        background_color: `#E71F00E6`,
        theme_color: `#D70000`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png` // This path is relative to the root of the site.
      }
    },
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
              maxWidth: 800,
              quality: 70
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
