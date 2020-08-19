# react-demo

Welcome to my react demo. I previously been using Polymer 3 framework. Learning React to expand my abilities. 

Overall, this will be a work in progress while I am honing my skills.

8/18 Website is now a PWA and runs great. Time to make pretty!



## Known Issues

- ~~Webpack build not working correctly

- Switch to lazy importing like Lego.js

-  ~~Uncaught SyntaxError: Unexpected token '<' when built and depolyed likely webpack

-  ~~Service Worker

- Had to remove react-icons making bundle huge, need to make own drawer icons




## AppShell (Currently Focus)

- Overall reusable component that handles routing, drawer, and app header


### AppShell To Do

- Be able to pass in pages (works but need to import dynamically) and styling  

- ~~Getting kind of big, pull apart and make AppToolbar Component~~

- Figure out isMounted (memory leak)



## Lego 

- Showcases working with API, Data, CSS, and Adobe Illustrator

- Fetches a random Star Wars character from https://swapi.dev/ 
 
- Uses data to color hair, eyes, and skin of minifigure
 
- Height data sets scale
 
- Hair set to bald if need to 
 
- Handles receiving 404 from API


### Lego To Do (in "free time")

- Overall, I feel it gets the point across
 
- Need to streamline translateCharOptions and updateCharacter functions
 
- SVGs need to be tweaked to clean-up CSS and make this section more responsive
 
- Clean up CSS
 
- componentDidMount running when drawer open?



## Chat (Work in Progress focused on AppShell)

- Showcases working Firebase Login and Firebase Realtime Database


### Chat to Do (Lots)

- Need to make it look pretty 

- Be able to have separate Chats with different users

- Be able to notify me if someone starts a Chat


