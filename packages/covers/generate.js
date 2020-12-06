const puppeteer = require('puppeteer');
const _ = require('lodash');
const fs = require('fs');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const generate = async (env, lang, all) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setViewport({ width: 800, height: 100000, deviceScaleFactor: 2 });

    const url = env === 'develop' ? `http://localhost:8000/images` :
    (`http://localhost:9000/${lang === 'en' ? '' : 'sv/'}images/`)

    await page.goto(url, { waitUntil: 'networkidle2' });

    await sleep(5000);

    async function screenshotDOMElement() {
        const rects = await page.evaluate(() => {
            const elements = [...document.getElementsByClassName('story')];

            if (!elements) {
                throw Error(`Could not find elements.`);
            }

            return elements.map((element, index) => {
                const { x, y, width, height } = element.getBoundingClientRect();
                const title = element.querySelector('.storytitle')
                const rect = { left: x, top: y, width, height, id: index, title: title.innerText };
                return rect;
            });
        });

        if (!rects)
            throw Error(`Could not find elements.`);

        let filteredRects;
        let filteredSerpRects;

        if (!all) {
            filteredRects = rects.filter(x => !fs.existsSync(`../../content/${lang}/covers/${_.kebabCase(x.title)}.png`))
            filteredSerpRects = rects.filter(x => !fs.existsSync(`../../content/${lang}/serp-covers/${_.kebabCase(x.title)}.png`))
        } else {
            filteredRects = rects;
            filteredSerpRects = rects;
        }

        const screenshots = filteredRects.map(async rect => {
            return await page.screenshot({
                path: lang === 'develop' ? `../../covers/${_.kebabCase(rect.title)}.png` : `../../content/${lang}/covers/${_.kebabCase(rect.title)}.png`,
                clip: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                },
                omitBackground: true
            });
        });

        const serpScreenshots = filteredSerpRects.map(async rect => {
            return await page.screenshot({
                path: lang === 'develop' ? `../../serp-covers/${_.kebabCase(rect.title)}.png` : `../../content/${lang}/serp-covers/${_.kebabCase(rect.title)}.png`,
                clip: {
                    x: rect.left - 23,
                    y: rect.top,
                    width: rect.width + 47,
                    height: rect.height
                },
                omitBackground: true
            });
        });

        return await Promise.all([...screenshots, ...serpScreenshots]);
    }

    await screenshotDOMElement();

    browser.close();
};

var arg = process.argv.slice(2)[0];

if (arg === "develop") {
    generate('develop', 'sv', false);
} else if (arg === 'all') {
    generate('production','en', true);
    generate('production','sv', true);
} else {
    generate('production','en', false);
    generate('production','sv', false);
}

