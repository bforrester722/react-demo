# react-demo

Welcome to my react demo. I previously been using Polymer 3 framework. Learning React to expand my abilities. 

Overall, this will be a work in progress while I am honing my skills.


8/1  Started learning React
8/17 Intial push with Lego and Chat
8/18 Webpack and Service worker working now a PWA (Lighthouse scores all green)
8/19 Made and added lottie animations for color and movement to home page (still needs work though) 


## To do

- Make Home page prettier

- Move drawer and menu to right side

- Added firebase database so I can change home page text 

- Had to remove react-icons making bundle huge, need to make own drawer icons

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
 
- componentDidMount running when drawer open?



## Chat (Work in Progress focused on AppShell)

- Showcases working Firebase Login and Firebase Realtime Database


### Chat to Do (Lots)

- Need to make it look pretty 

- Be able to have separate Chats with different users

- Be able to notify me if someone starts a Chat


