// Out of date

const fs = require('fs');
const util = require('util');
const removeMd = require('remove-markdown');
const fm = require('front-matter')
const textToSpeech = require('@google-cloud/text-to-speech');
const kebabCase = require('lodash/kebabCase');
const { strings } = require('../src/utils/localization');

const postsFolder = `./content/${process.env.GATSBY_SITE_LANG ? process.env.GATSBY_SITE_LANG : 'sv'}/posts/`;
const audioFolder = `./content/${process.env.GATSBY_SITE_LANG ? process.env.GATSBY_SITE_LANG : 'sv'}/audio/`;
const speakingRate = process.env.GATSBY_SITE_LANG ? 0.9 : 0.8;
const languageCode = process.env.GATSBY_SITE_LANG ? 'en-US' : 'sv-SE';
const name = process.env.GATSBY_SITE_LANG ? 'en-US-Wavenet-F' : 'sv-SE-Wavenet-A';

async function createAll() {
    const files = fs.readdirSync(postsFolder);

    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf(".md") > -1) {
            await generateMp3(files[i])
        }
    }    
}

// Requires a google-api.json file
const client = new textToSpeech.TextToSpeechClient({ keyFilename: "./google-api.json" });

async function generateMp3(file) {
    var text = fs.readFileSync(`${postsFolder}${file}`, "utf-8");
    const obj = fm(text);
    var body = obj.body;
    const title = obj.attributes.title;
    const author = obj.attributes.author;
    body = body.split('>').join('')
    body = removeMd(body)

    const story = `${title}.\n${strings.by} ${author}.\n${body}.\n${strings.theEnd}.`;

    if (story.length > 5000) {
        console.log(`${title} is ${story.length} characters. Skipping.`);
        return;
    }

    // TODO: Return if mp3 exists

    const request = {
        input: { text: story },
        voice: {
            languageCode: languageCode,
            ssmlGender: 'NEUTRAL',
            name: name
        },
        audioConfig: {
            audioEncoding: 'MP3',
            pitch: 1,
            speakingRate: speakingRate
        },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`${audioFolder}${kebabCase(title)}.mp3`, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${audioFolder}${kebabCase(title)}.mp3`);
}

createAll();