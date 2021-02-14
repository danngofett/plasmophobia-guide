const path = require('path')

module.exports = {
  siteMetadata: {
    title: "plasmophobia-hunter",
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "123456",
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": path.resolve(__dirname, "src"),
          "@components": path.resolve(__dirname, "src/components"),
          "@layouts": path.resolve(__dirname, "src/layouts"),
          "@pages": path.resolve(__dirname, "src/pages"),
          "@data": path.resolve(__dirname, "src/data")
        },
        extensions: [
          "json",
          "js"
        ]
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
