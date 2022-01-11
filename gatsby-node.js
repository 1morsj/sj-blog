/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});

// typescript files
exports.createPages = require("./src/createPages/createPages").createPages;

//https://www.surinderbhomra.com/Blog/2020/01/11/Gatsby-Include-Date-In-Blog-Post-Slug
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
      const relativeFilePath = createFilePath({ node, getNode, trailingSlash: false });
      const postDate = moment(node.frontmatter.date); // Use moment.js to easily change date format.
      const url = `/Blog/${postDate.format("YYYY/MM/DD")}${node.frontmatter.slug}`;

      createNodeField({
        name: `slug`,
        node,
        value: url,
      });
    }
  }
