const path = require(`path`)

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
      }
    `
  )
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create pages for each markdown file.
  const countryTemplate = path.resolve(`./src/templates/countrypage.js`)
  result.data.allCountry.edges.forEach(({ node }) => {
    const slug = node.slug
    const realPath = "q/" + slug
    createPage({
      path: realPath,
      component: countryTemplate,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        // path,
      },
    })
  })
}
