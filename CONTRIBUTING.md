# Contributing to iStoriez

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The stories, cover art, and audio recordings on iStoriez are all in the `content` folder. The folder has one sub folder for each language (`en`, `sv`) and one common `images` folder containing cover art. The images in the `images` folder acts as a base language specific cover art. The language specific variants are produced by running `npm covers`, which will produce language variants for each story where there is no existing cover art for that language. The language specific covers are images with the base image and also the title of the story, which is specified in markdown frontmatter. The base images and the stories are connected through their filenames, so for this reason all stories for all languages have English filenames. There are two variants of cover art produced, one in the `covers` folder, and one in the `serp-covers` folder. The files in `covers` are used in the carousels and the feeds, and the files in `serp-covers` are used in the story. `serp-covers` images have some transparent left and right padding making them square, to show their full content in search engines.

## Adding a story

* Fork this repository.
* Add a markdown file to the `posts` folder for the language you're working with, containing the story.
* Make a cover image and add to the `images` folder.
* Run `start-covers`. This will start the local site with a page showing the cover art renderings which will be used to generate the cover art images. Here you can adjust font size and other frontmatter settings to make the story title fit well with your image.
* Run `covers`. This will generate the cover images for your story.
* Submit your pull request.

## Adding a language

To add support for a language on iStoriez, please make a pull request with:

* Updates to`localization.js`.
* A folder in `content` for the added language, with translated content in the `pages` folder.
* At least one bedtime story.
