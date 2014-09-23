CS3240 ChocolateChip-UI Lab Assignment
===============================

### Introduction

As someone interested in both software development and design, the two sites that I visit frequently are [Hacker News](https://news.ycombinator.com/news) and [Designer News](https://news.layervault.com/). I thought it would be great if I had to go to one single page to access the information of both sites. Hence I built **Builder News**, which is a Hacker News and Designer News aggregator.

The live site can be found at [http://yangshun.im/builder-news](http://yangshun.im/builder-news).

### Description

Builder News is a Hacker News and Designer News aggregator. It shows the top links from each site and allows users to save their favourite links locally in their browser. I created the Hacker News and Designer News API using [Kimono Labs](http://kimonolabs.com/) and displayed the combined content in one single page.

### Features
- Combined content from Hacker News and Designer News
- Bookmarking features
- Flashy animations

### Grading Rubrics

#### ChUI
- At least 3 different page designs:
  - Home page
  - Favourites page
  - About page
  - Settings page

- 3 Different UI Components
  - Navigation List
    - Main List on Home page
  - Segmented Panel
    - "News Type" Selector on Home page
  - Popup
    - Favourite a link by pressing the star icon on a link.
    - Press the star icon again.
    - The popup will be shown to ask the user to confirm their decision to remove the favourited link.
  - Search bar
    - On the favourites page, the user is able to filter the links by typing in the search box.
- Includes a setting page or a page with form components
  - Settings page
    - Default news type segmented panel
    - Maximum number of items in feed slider
  - Favourites page
    - Search box

#### JavaScript
- The app can display content dynamically
  - The feed is populated from a Hacker News and Designer News API that I built using Kimono Labs.
- Settings or form components could modify the app's behaviours
  - Has a segmented panel to display the default category of news to display upon load of the site.
  - Has a slider to adjust the maximum number of items shown in the feed.
  - Search box on favourites page to filter out favourites

#### Others
- Usability of the app
  - There are no complex user interactions in the page and it is simple to use.
  - The interface is not cluttered and makes use of conventional mobile app layouts.
  - A confirmation popup is presented to the user in case the user accidentally unfavourites a link.


By Tay Yang Shun (A0073063M)
