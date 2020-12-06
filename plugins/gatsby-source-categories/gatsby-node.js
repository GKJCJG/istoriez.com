const _ = require('lodash');

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
}) => {
    const categories = _.uniq(_.flattenDeep(_.map(getNodesByType("MarkdownRemark"), 'frontmatter.tags'))).filter(Boolean)

    const { createNode } = actions

    categories.forEach(category =>
        {
            const slug = `${_.kebabCase(category)}/`
            const name = category

            createNode({
                slug: slug,
                name: name,
                id: createNodeId(`Category-${_.kebabCase(category)}`),
                parent: null,
                children: [],
                internal: {
                    type: 'Category',
                    content: JSON.stringify(category),
                    contentDigest: createContentDigest(category),
                },
            })
        }
       
    )
    return
}