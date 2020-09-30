# react-demo

Welcome to my react demo. I previously been using Polymer 3 framework. Learning React to expand my abilities. 
Overall, this will be a work in progress while I am honing my skills.

- 8/1  Started learning React
- 8/17 Intial push with Lego and Chat
- 8/18 Webpack and Service worker working now a PWA (Lighthouse scores all green)
- 8/19 Made and added lottie animations for color and movement to home page (still needs work though) 
- 8/20 - 8/26 Had to work on other stuff
- 8/27 Pushed up better looking dark version, still a work in progress need to clean up
- *8/27 left image coming from database big so I can work to handle lag
- 9/1 - 9/29 Mom passed away
- 9/30 Fixed routing issue where not acting like SPA

## To do


- Added firebase database so I can change home page text, did but not to handle picture coming in

- Make two webpack configs 


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
 
- ~~componentDidMount running when drawer open?



## Chat (Work in Progress focused on AppShell)

- Showcases working Firebase Login and Firebase Realtime Database


### Chat to Do (Lots)

- Need to make it look pretty 

- Be able to have separate Chats with different users

- Be able to notify me if someone starts a Chat


