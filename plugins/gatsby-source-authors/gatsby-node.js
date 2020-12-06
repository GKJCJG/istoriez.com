const _ = require('lodash');

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
}) => {
    const authors = _.uniq(_.map(getNodesByType("MarkdownRemark"), 'frontmatter.author')).filter(Boolean);

    const { createNode } = actions

    authors.forEach(author =>
        {
            const slug = `${_.kebabCase(author)}/`
            const name = author

            createNode({
                slug: slug,
                name: name,
                id: createNodeId(`Author-${_.kebabCase(author)}`),
                parent: null,
                children: [],
                internal: {
                    type: 'Author',
                    content: JSON.stringify(author),
                    contentDigest: createContentDigest(author),
                },
            })
        }
       
    )
    return
}