console.log(`Running in environment: ${process.env.NODE_ENV}`)
require("dotenv").config({
  path: `../.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `buyxiny.com`,
    description: ``,
    author: ``,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-310266-10",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: false,
        // Setting this parameter is also optional
        respectDNT: false,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
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
            conditions: [["active", "==", true]],
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `./src/assets/img/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
