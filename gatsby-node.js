// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

// // You can delete this file if you're not using it
// const path = require("path")

// exports.createOnPage = async ({ page, actions }) => {
//   const { createPage } = actions
//   console.log("Page - ", page.path)

//   if (page.path.match(/^\/team/)) {
//     await createPage({
//       path: "/team",
//       matchPath: "/team/:id",
//       component: path.resolve(`src/pages/team/{id}.js`),
//     })
//   }
// }
