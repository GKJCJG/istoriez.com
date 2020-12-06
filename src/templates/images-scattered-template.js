import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import EdgeStory from '../components/Story/EdgeStory'

const ImagesScatteredTemplate = ({ data }) => {
    const { edges } = data.allMarkdownRemark;

    let used = [];

    const getRandomArbitrary = (index) => {
        const minx = -100
        const miny = -100
        const maxx = window.innerWidth - 100;
        const maxy = window.innerHeight - 100;

        const screen = Math.hypot(window.innerWidth, window.innerHeight)
        const distance = Math.floor(screen / 12);

        let x = 0;
        let y = 0;
        let i = 0;
        const imax = 5000;
        do {
            x = Math.random() * (maxx - minx) + minx;
            y = Math.random() * (maxy - miny) + miny;
            i++;
        }
        while (used.find(u => {
            const dist = Math.hypot(x - u.x, y - u.y);
            return dist < distance && i < imax
        }));

        if (i === imax) {
            console.log('imax for index ' + index)
        }

        const pos = { x, y, rotate: Math.random() * 90 - 45 };
        used.push(pos)

        return pos;
    }

    return (
        <Page pageTitle='Images' style={{ background: "transparent" }}>
            {edges && edges.map((edge, index) => {
                const pos = getRandomArbitrary(index);
                return <Story style={{ position: "fixed", left: pos.x, top: pos.y, transform: `rotate(${pos.rotate}deg)` }} key={edge.node.fields.slug} edge={edge} attributes={false} />

            })}
        </Page>
    );
};

export const query = graphql`
query ImagesScatteredPage {
    allMarkdownRemark(sort: {fields: fields___stars, order: ASC}, filter: { frontmatter: { author: { ne: null } } }) {
        ...ImagesEdges
    }
}
`;

export default ImagesScatteredTemplate;
