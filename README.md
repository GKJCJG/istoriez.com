# iStoriez.com

Bedtime Stories Online
https://www.istoriez.com

iStoriez is a web platform for bedtime stories with a mobile first approach and a modern UI. iStoriez is open source so that anyone can add bedtime stories and get earnings for ad revenue for that story. You can add:

* Stories you've written yourself.
* Stories in the public domain.
* Translations of existing stories into other languages.
* Audio recordings of existing stories which does not already have audio.

iStoriez is blazing fast since it is a static website, compiled from the assets in this repository using [GatsbyJS](https://github.com/gatsbyjs/gatsby). It has the following features:

* Language support for English and Swedish stories, with auto redirect to a language based on client location and client language
* A Start page showing the latest stories at the top with a special zoom carousel, then regular carousels for short stories, medium length stories and long stories.
  * The carousels are built with infinite scroll support and can support any number of stories.
  * Filtering can be done on age and category or age and author, but not category and author.
  * Each carousel has an arrow that can be pressed before or after filtering to show a vertically scrollable feed with the stories in the carousel, for a better overview.
  * The stories in the carousels and feeds are ordered by the average rating the stories have received by readers.
  * The start page retains the positions of the carousels when navigating to a story and then back to the start page again.
* A Your Library page showing stories the reader has marked as favorites, and stories the reader has recently read.
* An Audio Stories page, which lists all audio stories in a separate feed. All audio stories also have a corresponding text story. The audio story can be started from the Audio Stories page or from the text story. The audio player shows in the bottom of the screen and remains playing as the listener navigates to other parts of iStoriez.
* Dark and light theme. The dark theme lessens the strain on the eyes when reading in dark settings. The dark theme also shows a moon and twinkling stars behind the topmost carousel on the start page. Letter spacing in stories are somewhat wider in dark theme to make reading easier.
* A search feature which searches for titles, authors and categories.

iStoriez is also available as an [app on Google Play](https://play.google.com/store/apps/details?id=com.istoriez.twa). The app uses the same markdown file based stories in this repository as the web site, but deployed from the [pwa branch](https://github.com/magnusarinell/istoriez.com/tree/pwa).

## Adding a story or a language

Please see [Contributing](CONTRIBUTING.md)

## Earnings

When you add a story with cover art to iStoriez and it gets approved and is published, you get 100% of the ad revenue for that page for all future. If you want to add a story but don't want or can't create cover art for it you get 50%. If you add cover art to an existing story without cover art you get 50%. Earnings are payed when the total earnings for your stories exceed steps of $10. A website is currently under development to show earnings for each story.

These numbers and conditions are subject to change. There are no ads for audio stories for example, but audio stories are a central feature of iStoriez and needs a compensation model. Also, platform development is not included in this compensation model but should be in the future. Such contributions may take the form of total earning shares, and the percentage of ad revenue per story may then be less than 100%, but only for new stories. For stories you add now the percentage will always remain 100%.

## Getting started

Clone this repository, then run:

`npm ci`  
`npm start`

After that you'll be able to view iStoriez at `http://localhost:8000`

© 2019-2020 Magnus Arinell
