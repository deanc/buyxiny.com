const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allCountry {
          edges {
            node {
              id
              slug
              name
            }
          }
        }
        allItem {
          edges {
            node {
              id
              slug
              name
              type
              locations {
                id
                name
              }
            }
          }
        }
      }
    `
  )
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // get all unique types
  const types = _.uniq(result.data.allItem.edges.map(({ node }) => node.type))

  const validCountries = process.env.GATSBY_VALID_COUNTRIES.split(",")

  // Create pages for each country
  const countryTemplate = path.resolve(`./src/templates/CountryPage.js`)
  const addItemTemplate = path.resolve(`./src/templates/AddItemPage.js`)
  result.data.allCountry.edges.forEach(({ node }) => {
    const slug = node.slug
    if (validCountries.includes(slug)) {
      // create root page
      const realPath = "q/" + slug
      createPage({
        path: realPath,
        component: countryTemplate,
        context: {
          // path,
          country: node.slug,
          showSearch: true,
        },
      })

      // create type page
      types.forEach(type => {
        createPage({
          path: realPath + "/add",
          component: addItemTemplate,
          context: {
            // path,
            country: node.slug,
            countryRef: node.id,
            showSearch: false,
          },
        })
      })

      // create add pages
      types.forEach(type => {
        createPage({
          path: realPath + "/" + type + "s",
          component: countryTemplate,
          context: {
            // path,
            country: node.slug,
            type,
            showSearch: true,
          },
        })
      })
    }
  })

  // create pages for the item types for each country

  // Create pages for each item
  const itemTemplate = path.resolve(`./src/templates/ItemPage.js`)
  result.data.allItem.edges.forEach(({ node }) => {
    const slug = node.slug

    validCountries.forEach(country => {
      const realPath = "q/where-to-buy-" + slug + "-in-" + country
      createPage({
        path: realPath,
        component: itemTemplate,
        context: {
          // path,
          id: node.id,
          name: node.name,
          slug,
          country,
          showSearch: true,
        },
      })
    })
  })
}
