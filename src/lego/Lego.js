import React, { Component } from 'react';
import {wait} from '../helpers/utils';
import Hair from './Hair.js'
import Face from './Face.js'
import Body from './Body.js'
import Legs from './Legs.js'
import vader from './vader.mp3'
import './lego.css';
import './faces.css';

export default class Lego extends Component {
  
  constructor() {
    super();
    this.handleRandCharClick  = this.handleRandCharClick.bind(this);
  }

  _isMounted = false;

  state = {
    body:       0,
    character:  {name: "...Loading"},
    face:       0,
    hair:       0,
    leg:        0,
    opacity:    '.5',
    
    colorCorrections: {
      auburn: '#922724',
      blond:  'gold',
      blonde:  'gold',
      brown:  'saddlebrown',
      dark:   '#42210B',
      fair:   'bisque',
      hazel:  'radial-gradient(yellow, #594c26 )',
      light:  'navajowhite',
      metal:  'silver',
      pale:   'bisque',
      unknown:'brown',
      white:  '#ddd6de',
      none:   'saddlebrown',
      'green-tan' : 'green'
    },
  };

    // random number for setting hair, face, and body
  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // fetch random starwars char when ready
  componentDidMount() {
    this._isMounted = true;
    this.props.onHeaderTitle('Lego');  
    this.fetchRandomCharacter();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // gets new random character when btn clicked
  async handleRandCharClick() {
    await this.setState({
      body:       0,
      character:  {name: "...Loading"},
      face:       0,
      hair:       0,
      leg:        0,
      opacity:    '.5',
      textIn:     false
    })
    this.translateCharOptions();

    this.fetchRandomCharacter();
  }

  // fetch character from swapi.dev/api
  fetchRandomCharacter() {
    // 82
    const rand = this.getRandomNum(1, 85);
    fetch(`https://swapi.dev/api/people/${rand}/`)
        .then(response => response.json())
        .then(data => {
          this.updateCharacter(data)
        })
  }


  // updates character and runs animation to new values
  async updateCharacter(char) {
    await wait(1000)
    if (this._isMounted) {
      if (char.name === 'Darth Vader') {
        this.setVader(char);
        return;
      }
      // if api return 404 show Goku
      if (char.detail === 'Not found') {
        this.setState({
          body:       500,
          character:  {
            name: "Not Found ",
            hair_color: 'blond',
            skin_color: 'fair'
          },
          face:       500,
          hair:       700,
          leg:        500,
          opacity:    '1',
          textIn:     true
        })
      }
      // sets random values for char
      else {
        const isBald = char.hair_color === 'none' || char.hair_color === 'n/a' ? true : false;
        this.setState({
          body:       this.getRandomNum(1, 4) * 100,
          character:  char,
          face:       this.getRandomNum(1, 5) * 100,
          hair:       isBald ? 0 : this.getRandomNum(2, 6) * 100,
          leg:        this.getRandomNum(1, 4) * 100,
          opacity:    '1',
          textIn:     true
        })
      }
     this.translateCharOptions();
    }
  }


  setVader(char) {
    this.setState({
        body:       400,
        character:  char,
        face:       400,
        hair:       600,
        leg:        400,
        opacity:    '1',
        textIn:     true
      })
    this.translateCharOptions();
    const audio = new Audio(vader)
    audio.volume = 0.2;
    audio.play()
  }

  // animates to random selected value
  // translateCharOptions(name, state) {
  //   var feature = document.querySelector(`.${name}`);
  //   feature.style.transform = 'translateX(-' + this.state[state] + '%)';
  // }


  translateCharOptions() {
    const featuresArray = [ 
      {wrapper: 'hair-styles',  item: 'hair' },
      {wrapper: 'faces',        item: 'face' },
      {wrapper: 'bodies',       item: 'body' },
      {wrapper: 'legs',         item: 'leg' }
    ];

    featuresArray.forEach(feature => {
      const item = document.querySelector(`.${feature.wrapper}`);
      item.style.transform = 'translateX(-' + this.state[feature.item] + '%)';
    })

  }

  // sets feature based on slider
  setFeature(event, stateName, className) {
    this.setState({[stateName]: event.target.value});
    var feature = document.querySelector(`.${className}`);
    feature.style.transform = `translate(-${event.target.value}%, 0px)`;
  };

  // raises and lowers head, legs, and hair
  animateFeature(action) {
    const {lower, raise} = action;
    if (lower) {
      const lowerLegs = document.querySelector(`.${lower}`);
      lowerLegs.style.transform = `translateY(60px)`;
      const face = document.querySelector('.faces');
      this.setState({
        cachedFace: face.style.transform
      })
      face.style.transform = `translateX(-600%)`;
    }
    if (raise) {
      const raiseHead = document.querySelector(`.${raise}`);
      raiseHead.style.transform = `translateY(-60px)`;
    }
  }

  // resets animated features after use lets go of slider
  async resetFeature(action) {
    const {lower, raise} = action;
    await wait(200);
    if (lower) {
      const lowerHead = document.querySelector(`.${lower}`);
      lowerHead.style.transform = `translateY(0px)`;
    }
    if (raise) {
      const raiseLegs = document.querySelector(`.${raise}`);
      raiseLegs.style.transform = `translateY(0px)`;
      const face = document.querySelector('.faces');
      face.style.transform = this.state.cachedFace;
    }
  }

  // checks if color is in colorCorrections array and returns color
  getCorrectedColor(color) {
    const removeMottle = color.replace('mottled', '').replace('mottle', '');
    const correctedColor = this.state.colorCorrections[removeMottle];
    return correctedColor ? correctedColor : removeMottle;
  }

  // if color is area return corrected array otherwis return corrected color
  getColor(type) {
    const color = this.state.character[type];
    if (!color) { return 'aqua'; }
    if (color.indexOf(',') > -1) {
      const colorArr = color.split(',');
      const getThirdColor = () => {
        return colorArr[2] ? colorArr[2] : colorArr[0]
      }
      return {
        color1: this.getCorrectedColor(colorArr[0]), 
        color2: this.getCorrectedColor(colorArr[1]), 
        color3: this.getCorrectedColor(getThirdColor())
      }
    }
    return this.getCorrectedColor(color);
  }

  // limits scale high and low
  getDemision(multi) {
    if (multi > .6 || !multi) {
      return .6
    }
    return multi < .35 ? .35 : multi;
  }

  // set scale based on height divided by average
  getSize(char) {
    const {height} = char;
    if (!height ) {
      return {transform: 'scale(.6)'}; 
    }
    const xMulti = height / 170 - .5;
    const x = this.getDemision(xMulti)
    return {transform: `scale(${x})`};
  }



  render() {
    // deconstruct state so I don't have to use this.state everywhere 
    // don't know if this is convention
    const {body, character, hair, face, leg, opacity, textIn } = this.state;
    const skinColor   = this.getColor('skin_color');
    const hairColor   = this.getColor('hair_color');
    const eyeColor    = this.getColor('eye_color');


    return (
   
      <div className="lego-page">
        <div className="lego-info-wrapper">
          <div className="minifigure-wrapper">
            <h2 className={textIn ? 'textIn' : ''} style={{textAlign: 'center', opacity: 1, height: '23px', marginTop: '16px', marginBottom: '-24px'}}> {character.name}</h2>
            <div className="minifigure " style={this.getSize(character)}>

              <div className="head">
                <Face skinColor={skinColor} eyeColor={eyeColor} opacity={opacity}/>
                <div className="hairs">
                <Hair hairColor={hairColor} skinColor={skinColor} opacity={opacity} />
              </div>
               
              </div>
              <Body skinColor={skinColor} opacity={opacity}/>
              <div className="lower">
                <Legs skinColor={skinColor} opacity={opacity}/>
              </div>
            </div>
          </div>

          <div className="controls">
            <fieldset className="head-expression">

              <div className="form-element">
                <label htmlFor="hair">Hair</label>
                <input onChange={(event) => this.setFeature(event, 'hair', 'hair-styles')} 
                       onTouchStart={(event) => this.animateFeature({raise: 'hairs'})} 
                       onTouchEnd={() => this.resetFeature({lower: 'hairs'})}
                       name="hair" type="range" min="0" max="600" step="100" value={hair}/>
              </div>
          
              <div className="form-element">
                <label htmlFor="face">Face</label>
                <input onChange={(event) => this.setFeature(event, 'face', 'faces')}
                       name="face" type="range" min="0" max="400" step="100" value={face}/>
              </div>
          
              <div className="form-element">
                <label htmlFor="body">Body</label>
                <input onChange={(event) => this.setFeature(event, 'body', 'bodies')}
                       onTouchStart={(event) => this.animateFeature({lower: 'lower', raise: 'head'})} 
                       onTouchEnd={() => this.resetFeature({lower: 'head', raise: 'lower'})}
                       name="body" type="range" min="100" max="400" step="100" value={body}/>
              </div>
       
              <div className="form-element">
                <label htmlFor="legs">Legs</label>
                <input onChange={(event) => this.setFeature(event, 'leg', 'legs')} 
                       onTouchStart={() => this.animateFeature({lower: 'lower'})}
                       onTouchEnd={() => this.resetFeature({raise: 'lower'})}
                       name="legs" type="range" min="100" max="400" step="100" value={leg}/>
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="btn " type="button" disabled={character.name === "...Loading"} onClick={this.handleRandCharClick}>
                  {character.name === "...Loading" ? "...Loading" : "New Character"}
                </button>
              </div>
              
            </fieldset>
          </div>

          <div className="lego-stats-grid">
            <div className="stat-wrapper">
              <span>Birthyear:</span>
              <span>{character.birth_year}</span>
            </div>
            <div className="stat-wrapper">
              <span>Height:</span>
              <span>{character.height}</span>
            </div>
            <div className="stat-wrapper">
              <span>Mass:</span>
              <span>{character.mass}</span>
            </div>
            <div className="stat-wrapper">
              <span>Gender:</span>
              <span>{character.gender}</span>
            </div>
            <div className="stat-wrapper">
              <span>Hair:</span>
              <span>{character.hair_color}</span>
            </div>
            <div className="stat-wrapper">
              <span>Eye:</span>
              <span>{character.eye_color}</span>
            </div>
            <div className="stat-wrapper">
              <span>Skin:</span>
              <span>{character.skin_color}</span>
            </div>
          </div>
        </div>
   
      </div>
    )
  }
}