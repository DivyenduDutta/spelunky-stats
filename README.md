<p align="center"><img src="https://github.com/DivyenduDutta/spelunky-stats/blob/main/src/assets/header.gif" alt="Vue logo"></p>

<p align="center">
  <a href="https://travis-ci.com/DivyenduDutta/spelunky-stats"><img src="https://travis-ci.com/DivyenduDutta/spelunky-stats.svg?branch=main" alt="Build Status"></a> &nbsp;
  <a href="https://v3.vuejs.org/"><img src="https://img.shields.io/badge/Vue-3.x-green" alt="Vuejs3"></a>
</p>

<h2 align="center">Spelunky Stats</h2>

Web app written in Vue3 to capture and display the count of death causes in <a href="https://www.gog.com/game/spelunky">Spelunky</a>. Spelunky is an amazing indie platformer rougelike

All the pixel art is custom made (yep, including the cursor icon XD)

The current deployed app (which can be found <a href="https://spelunky-stats.web.app/">here</a>) allows only me to log in as an admin since only my gmail ID is associated as admin in the app. Non admin users can only view data.

<p align="center"><img src="https://github.com/DivyenduDutta/spelunky-stats/blob/main/images/causes.PNG" alt="causes"></p> <br/>
<p align="center"><img src="https://github.com/DivyenduDutta/spelunky-stats/blob/main/images/bar_graph.PNG" alt="bar_graph"></p>

The admin once logged in (by clicking on "Admin-Login" at the top right corner) can input new death causes and <p align="center"><img src="https://github.com/DivyenduDutta/spelunky-stats/blob/main/images/input.PNG" alt="submit"></p> them.

<p align="center"><img src="https://github.com/DivyenduDutta/spelunky-stats/blob/main/src/assets/header.gif" alt="input"></p>

The admin can also add/subtract counts for each death cause using <p align="center"><img src="https://github.com/DivyenduDutta/spelunky-stats/blob/main/src/assets/plus.png" alt="plus"></p> and <p align="center"><img src="https://github.com/DivyenduDutta/spelunky-stats/blob/main/src/assets/minus.png" alt="minus"></p>



## Other Technologies Used

<a href="https://cli.vuejs.org/">Vue cli</a> is used to bootstrap the project.

The Bar Graph is made using <a href="https://d3js.org/">D3.js</a> which is an awesome JS library that can manipulate DOM based on data.

Authentication (Google Authenticator) and deployment is handled via <a href="https://firebase.google.com/docs">Firebase</a>

The app is styled using <a href="https://bulma.io/">Bulma</a>

## Motivation and closing thoughts

* Needed to justify all the time put into Spelunky. Spelunky 2 is out as well, so maybe there's gonna be more to this???
* Good pixel art practice.
* Vue is actually pretty damn good. The reactive nature is right up my alley. Sure its got its cons but for a small app, its a really good fit.
* Firebase is 10/10 although I did spend an embarassing amount of time to secure the RTDB :P
