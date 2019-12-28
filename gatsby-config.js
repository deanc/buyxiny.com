require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    {
      resolve: `@deanc/gatsby-source-firestorer`,
      options: {
        // credential or appConfig
        config: require("./src/config/firebase.env"),
        types: [
          {
            type: `Item`,
            collection: `items`,
            map: doc => ({
              ...doc,
              locations___NODE: doc.locations
                ? doc.locations.map(location => location.id)
                : [],
            }),
          },
          {
            type: `Country`,
            collection: `countries`,
            map: doc => ({
              ...doc,
            }),
          },
          {
            type: `Location`,
            collection: `locations`,
            map: doc => ({
              ...doc,
              country___NODE: doc.country ? doc.country.id : null,
            }),
          },
        ],
      },
    },
    `gatsby-plugin-layout`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/img/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
