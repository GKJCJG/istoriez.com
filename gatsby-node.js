'use strict';

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
        type MarkdownRemarkFrontmatter implements Node @dontInfer {
            font: Int
            lineheight: Int
            title: String!
            template: String
            author: String
            age: String
            color: String
            narrator: String
            style: String
            tags: [String]
            removeSuffix: Boolean
        }

        type MarkdownRemarkFields implements Node {
            modified: String
            slug: String!
            authorSlug: String
            viewsLastMonth: Int
            stars: String
            starVotes: String
            image: File @fileByRelativePath
            cover: File @fileByRelativePath
            serpcover: File @fileByRelativePath
            audio: File @fileByRelativePath
            narrator: String
        }
    `
    createTypes(typeDefs)
}

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
    if (getConfig().mode === 'production') {
        actions.setWebpackConfig({
            devtool: false
        });
    }
};