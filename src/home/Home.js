import React, {Component, lazy, Suspense} from 'react';
import {Link} from 'react-router-dom';
import Lottie from 'react-lottie-light';
import {wait} from '../helpers/utils';
// cant lazy load lottie animations
import chatAnimation    from '../animations/chat test.json';
import reactAnimation   from '../animations/react2.json';
import scoresAnimation  from '../animations/scores.json'
import './home.css';

const LazyLoad = lazy(() => import('react-lazyload'));


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  state = {
    chatAnimation:   chatAnimation,
    reactAnimation:  reactAnimation,
    scoresAnimation: scoresAnimation,
    dimensions:      '150px',
    isPaused:        true,
  }


  async componentDidMount() {

    this._isMounted = true;
    // import vader animation for code splitting (smaller bundle size)
    import('../animations/vader.json').then(vaderAnimation => {
      this.setState({ vaderAnimation })
    })

    // checks screen width to set lottie dimensions
    this.checkWidth = () => {
      const match = window.matchMedia(`(min-width: 768px)`);
      if (match.matches) {
        this.setState({
          dimensions: '350px',
        })
      }
      else {
        this.setState({
          dimensions: '150px',
        })
      }
    };

    this.checkWidth();
    this.setPause();
    window.addEventListener("resize", this.checkWidth);
 
  }

  // Pause video for 500ms then plays
  async setPause() {
    // await wait(500);
    this._isMounted && this.setState({
      isPaused: false
    })
  }


  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.checkWidth);
  }

  // sets up lottie animations
  lottieOptions(animation)  {
    if (animation === 'reactAnimation') {
      return {
        loop: false,
        animationData: this.state[animation],
      }
    }
    return {
      loop: true,
      animationData: this.state[animation],
    }
  };

  // sets width of react demo animation
  setReactDimensions() {
    const {width} = screen ;
    return width > 1200 ? 1200 : width;
  }

  // sets width of lighthouse animation
  setLighthouseDimensions(dimension) {
    const {width} = screen ;
    if (dimension === 'width') {
      return width > 568 ? 568 : width - 32;
    }
    return width > 568 ? 400 : width - 132;
  }


  render() {

    return (
      <div className={`home-page`} >

        <div className="img-animation-wrapper"> 
          <div id="react-lottie-wrapper" >
            <LazyLoad height={this.setReactDimensions()} >
              <Lottie isPaused={this.state.isPaused}
                      speed={1}
                      options={this.lottieOptions('reactAnimation')}
                      height={this.setReactDimensions()}
                      width={this.setReactDimensions()}/>
            </LazyLoad>
          </div>
        </div>
    
        <section className="home-main-txt-wrapper">
          <p className="home-main-txt" >
            Since a lot of employers are looking for developers with React experience, I thought it best to start and learn it. 
            That is where this project comes in, made with React and Firebase. This is very much a work in progress I started at around 8-1-2020. 
            I will remedy issues as I continue to learn best practices. All known issues I put on the README at <a rel="noreferrer"  className="link"target="_blank" href="https://github.com/bforrester722/react-demo">my github</a>. 
          </p>
        </section> 

        <div className="home-grid">
          
          <section className="section-wrapper"> 
            <LazyLoad height={this.state.dimensions} offset={-200}>
            <Lottie options={this.lottieOptions('vaderAnimation')}
                    height={this.state.dimensions}
                    speed= {.6}
                    width={this.state.dimensions}/>
            </LazyLoad>
            <Link to="/Lego" className="link"><h2>Lego</h2></Link>
            <ul>
              <li>Fetches a random Star Wars character from https://swapi.dev/ </li>
              <li>Uses data to edit minifigure</li>
              <li>Handles receiving 404 from API</li>
              <li>Showcases working with API, Data, CSS, and Adobe Illustrator</li>
            </ul>
          </section>
          
          <section className="section-wrapper">
            <LazyLoad height={this.state.dimensions} offset={-200}>
              <Lottie options={this.lottieOptions('chatAnimation')}
                      height={this.state.dimensions}
                      speed= {.9}
                      width={this.state.dimensions +32}/>
            </LazyLoad>
      
            <h2><Link to="/Chat" className="link">Chat</Link></h2>         
            <ul>
              <li>Allows users to sign up and login with email, Google account, or Facebook</li>
              <li>Showcases working Firebase Login and Firebase Realtime Database</li>
            </ul>
          </section>

          <section className="section-wrapper">
            <LazyLoad height={this.state.dimensions} offset={-200}>
              <Lottie options={this.lottieOptions('scoresAnimation')}
                      height={this.setLighthouseDimensions('height')}
                      speed= {.9}
                      width={this.setLighthouseDimensions('width')}/>
            </LazyLoad>
    
            <h2 className="home-header">Mobile Lighthouse Scores</h2>         
            <ul>
              <li>Google Lighthouse is an open-source, automated tool for measuring the quality of web pages</li>
              <li>These are the scores as 10/8</li>
            </ul>
          </section>
     
        </div>

        <div className="synth-grid-wrapper">
          <LazyLoad height={500} offset={100}>
            <svg id="Layer_1" className="synth-grid" data-name="Layer 1"   viewBox="0 0 551 285.14"><defs>
              <style>{`.gridcls-1{filter:url(#AI_GaussianBlur_7);}.gridcls-2{fill:url(#linear-gradient);}.gridcls-3,.gridcls-4{fill:none;stroke-miterlimit:10;}.gridcls-3{stroke:#000;stroke-width:28px;}.gridcls-4{stroke:url(#linear-gradient-2);}`}</style>
              <filter id="AI_GaussianBlur_7" name="AI_GaussianBlur_7"><feGaussianBlur stdDeviation="7"/></filter>
              <linearGradient id="linear-gradient" x1="14" y1="182.5" x2="537" y2="182.5" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#61dafb"/><stop offset="1" stopColor="#e442fc"/></linearGradient><linearGradient id="linear-gradient-2" x1="0.5" y1="227.99" x2="480.5" y2="227.99" gradientTransform="matrix(1, -0.04, 0.04, 1, 25.94, 8.32)" xlinkHref="#linear-gradient"/></defs><rect x="34.5" width="480" height="276"/><g className="gridcls-1"><rect className="gridcls-2" x="14" y="161.5" width="523" height="42"/><rect className="gridcls-3" x="14" y="161.5" width="523" height="42"/></g><polygon className="gridcls-4" points="36.41 284.62 32.94 188.57 37.05 187.51 59.91 187.51 82.74 187.51 105.6 187.49 105.62 187.49 128.47 187.49 128.48 187.49 151.33 187.49 151.34 187.48 174.19 187.48 197.05 187.48 219.91 187.47 242.77 187.47 265.62 187.46 288.48 187.45 311.34 187.45 334.19 187.44 357.05 187.44 379.91 187.43 379.92 187.43 402.78 187.43 402.79 187.43 425.63 187.43 425.64 187.43 448.48 187.41 448.49 187.41 471.33 187.41 471.34 187.41 494.2 187.4 494.21 187.4 513.21 187.4 516.09 267.32 36.41 284.62"/><polyline className="gridcls-4" points="36.2 278.86 78.72 278.85 135.39 278.84 192.07 278.82 197.21 278.82"/><polyline className="gridcls-4" points="35.73 265.9 43.62 265.91 95.5 265.89 147.37 265.88 199.25 265.87 251.13 265.86 303.01 265.84 354.89 265.83 406.77 265.82 458.64 265.81 458.65 265.81 510.52 265.79 510.53 265.79 516.04 265.79"/><polyline className="gridcls-4" points="35.34 254.97 61.83 254.97 109.66 254.95 157.49 254.94 205.32 254.93 253.15 254.92 300.98 254.9 348.82 254.89 396.64 254.88 396.65 254.88 444.47 254.87 492.3 254.85 492.31 254.85 515.64 254.85"/><polyline className="gridcls-4" points="515.31 245.5 476.73 245.51 476.72 245.51 432.35 245.52 387.98 245.53 343.63 245.54 343.62 245.54 299.25 245.55 254.88 245.57 210.51 245.58 166.15 245.59 121.77 245.6 77.41 245.61 35 245.62"/><polyline className="gridcls-4" points="34.71 237.53 49.52 237.53 90.88 237.52 132.26 237.5 173.63 237.49 215 237.48 256.38 237.47 297.75 237.47 339.13 237.46 380.5 237.44 421.86 237.43 463.24 237.42 463.25 237.42 504.62 237.41 504.63 237.41 515.01 237.41"/><polyline className="gridcls-4" points="34.45 230.46 63.9 230.46 102.66 230.45 141.42 230.43 180.17 230.42 218.93 230.41 257.68 230.41 296.44 230.39 335.19 230.38 335.2 230.38 373.95 230.38 412.7 230.37 451.46 230.35 451.47 230.35 490.22 230.34 514.76 230.34"/><polyline className="gridcls-4" points="34.23 224.23 40.13 224.23 76.58 224.22 113.04 224.21 149.49 224.21 185.94 224.19 222.39 224.19 258.83 224.17 295.28 224.17 331.74 224.15 368.18 224.15 404.62 224.14 404.63 224.14 441.09 224.13 477.54 224.12 513.99 224.11 514.53 224.11"/><polyline className="gridcls-4" points="34.03 218.7 53.42 218.71 87.83 218.69 122.23 218.68 156.65 218.67 191.05 218.67 225.45 218.66 259.85 218.65 294.25 218.64 328.67 218.63 363.07 218.62 397.47 218.62 397.48 218.62 431.88 218.61 431.89 218.61 466.29 218.6 500.69 218.59 500.7 218.59 514.34 218.59"/><polyline className="gridcls-4" points="514.16 213.65 488.82 213.65 488.81 213.65 456.25 213.67 456.24 213.67 423.66 213.67 391.07 213.68 358.5 213.69 325.93 213.7 293.35 213.7 260.76 213.72 228.19 213.72 195.62 213.72 163.04 213.74 130.46 213.74 97.89 213.75 65.31 213.76 33.85 213.77"/><polyline className="gridcls-4" points="33.69 209.33 45.06 209.32 76 209.31 106.93 209.31 137.87 209.3 168.79 209.29 199.74 209.28 230.66 209.28 261.58 209.27 292.51 209.26 323.45 209.25 354.38 209.25 385.31 209.24 416.24 209.23 416.25 209.23 447.18 209.22 447.19 209.22 478.12 209.22 509.04 209.21 509.05 209.21 514 209.2"/><path className="gridcls-4" d="M-.46,205.81c160.61.07,319.72.34,479.72-.11" transform="translate(34 -0.5)"/><path className="gridcls-4" d="M-.59,202.17c160.67,1.71,319.64-2,479.73-.12" transform="translate(34 -0.5)"/><polyline className="gridcls-4" points="33.29 198.34 48.68 198.33 75.56 198.33 102.43 198.32 129.29 198.32 156.16 198.31 183.03 198.3 209.9 198.3 236.75 198.29 263.62 198.28 290.48 198.28 290.49 198.28 317.35 198.27 344.21 198.26 371.08 198.26 397.95 198.25 424.81 198.24 424.82 198.24 451.67 198.23 451.68 198.23 478.53 198.22 478.54 198.22 505.39 198.23 505.4 198.23 513.6 198.22"/><polyline className="gridcls-4" points="513.49 195.17 495.81 195.18 495.8 195.18 470.08 195.19 470.07 195.19 444.35 195.19 444.34 195.19 418.61 195.19 392.87 195.2 367.13 195.21 341.39 195.22 315.66 195.22 289.92 195.23 264.18 195.23 238.44 195.24 212.72 195.25 186.97 195.25 161.23 195.26 135.5 195.27 109.76 195.28 84.02 195.28 58.27 195.28 33.18 195.29"/><polyline className="gridcls-4" points="33.08 192.49 42.42 192.49 67.08 192.49 91.79 192.47 116.5 192.47 141.2 192.46 165.91 192.46 190.6 192.45 215.31 192.44 240 192.44 264.7 192.43 289.4 192.43 314.1 192.42 338.8 192.42 338.81 192.42 363.49 192.41 388.2 192.4 412.9 192.4 412.92 192.4 437.59 192.39 437.6 192.39 462.3 192.39 462.31 192.39 486.98 192.38 511.69 192.38 511.7 192.38 513.39 192.37"/><polyline className="gridcls-4" points="32.99 189.9 51.53 189.9 75.23 189.89 98.98 189.88 122.73 189.88 146.47 189.87 170.22 189.87 193.96 189.86 217.71 189.85 241.44 189.85 265.18 189.84 288.92 189.85 312.67 189.84 336.4 189.83 336.41 189.83 360.15 189.83 383.89 189.82 383.9 189.82 407.65 189.81 431.38 189.81 455.12 189.8 455.13 189.8 478.85 189.8 478.86 189.8 502.6 189.79 502.61 189.79 513.3 189.79"/><polyline className="gridcls-4" points="513.41 192.86 511.7 192.38 511.69 192.38 502.61 189.79 502.6 189.79 494.21 187.4 494.2 187.4"/><path className="gridcls-4" d="M479.14,201.18c-14.12-4.3-27.29-8.82-41.81-13.27" transform="translate(34 -0.5)"/><polyline className="gridcls-4" points="514.06 211.01 509.05 209.21 509.04 209.21 497.91 205.2 497.9 205.2 487.78 201.55 487.77 201.55 478.54 198.22 478.53 198.22 470.08 195.19 470.07 195.19 462.31 192.39 462.3 192.39 455.13 189.8 455.12 189.8 448.49 187.41 448.48 187.41"/><polyline className="gridcls-4" points="425.62 187.41 425.63 187.43 425.64 187.43 431.38 189.81 437.59 192.39 437.6 192.39 444.34 195.19 444.35 195.19 451.67 198.23 451.68 198.23 459.69 201.57 459.7 201.57 468.45 205.2 468.46 205.2 478.12 209.22 488.81 213.65 488.82 213.65 500.69 218.59 500.7 218.59 513.99 224.11 514.54 224.34"/><polyline className="gridcls-4" points="515.2 242.6 504.63 237.41 504.62 237.41 490.22 230.34 477.54 224.12 466.29 218.6 456.25 213.67 456.24 213.67 447.19 209.22 447.18 209.22 439.02 205.21 431.6 201.57 424.82 198.24 424.81 198.24 418.61 195.19 412.92 192.4 412.9 192.4 407.65 189.81 402.79 187.43 402.78 187.43 402.77 187.42"/><polyline className="gridcls-4" points="513.25 267.42 510.53 265.79 510.52 265.79 492.31 254.85 492.3 254.85 476.73 245.51 476.72 245.51 463.25 237.42 463.24 237.42 451.47 230.35 451.46 230.35 441.09 224.13 431.89 218.61 431.88 218.61 423.66 213.67 416.25 209.23 416.24 209.23 409.56 205.22 403.49 201.57 397.95 198.25 392.87 195.2 388.2 192.4 383.9 189.82 383.89 189.82 379.92 187.43 379.91 187.43 379.9 187.42"/><polyline className="gridcls-4" points="357.05 187.44 360.15 189.83 363.49 192.41 367.13 195.21 371.08 198.26 375.39 201.59 380.12 205.23 385.31 209.24 391.07 213.68 397.47 218.62 397.48 218.62 404.62 224.14 404.63 224.14 412.7 230.37 421.86 237.43 432.35 245.52 444.47 254.87 458.64 265.81 458.65 265.81 463.09 269.23"/><polyline className="gridcls-4" points="411.64 271.08 406.77 265.82 396.65 254.88 396.64 254.88 387.98 245.53 380.5 237.44 373.95 230.38 368.18 224.15 363.07 218.62 358.5 213.69 354.38 209.25 350.68 205.24 350.67 205.24 347.29 201.59 344.21 198.26 341.39 195.22 338.81 192.42 338.8 192.42 336.41 189.83 336.4 189.83 334.19 187.44"/><polyline className="gridcls-4" points="311.34 187.45 312.67 189.84 314.1 192.42 315.66 195.22 317.35 198.27 319.19 201.59 319.2 201.59 321.23 205.24 323.45 209.25 325.93 213.7 328.67 218.63 331.74 224.15 335.19 230.38 335.2 230.38 339.13 237.46 343.62 245.54 343.63 245.54 348.82 254.89 354.89 265.83 358.88 272.99"/><polyline className="gridcls-4" points="304.69 274.94 303.01 265.84 300.98 254.9 299.25 245.55 297.75 237.47 296.44 230.39 295.28 224.17 294.25 218.64 293.35 213.7 292.51 209.26 291.78 205.25 291.1 201.6 290.49 198.28 290.48 198.28 289.92 195.23 289.4 192.43 288.92 189.85 288.48 187.45"/><polyline className="gridcls-4" points="265.62 187.45 265.62 187.46 265.18 189.84 264.7 192.43 264.18 195.23 263.62 198.28 263 201.61 262.33 205.25 261.58 209.27 260.76 213.72 259.85 218.65 258.83 224.17 257.68 230.41 256.38 237.47 254.88 245.57 253.15 254.92 251.13 265.86 249.08 276.95"/><polyline className="gridcls-4" points="191.95 279.01 192.07 278.82 199.25 265.87 205.32 254.93 210.51 245.58 215 237.48 218.93 230.41 222.39 224.19 225.45 218.66 228.19 213.72 230.66 209.28 232.88 205.27 234.91 201.62 236.75 198.29 238.44 195.24 240 192.44 241.44 189.85 242.77 187.47 242.77 187.46"/><polyline className="gridcls-4" points="133.27 281.13 135.39 278.84 147.37 265.88 157.49 254.94 166.15 245.59 173.63 237.49 180.17 230.42 185.94 224.19 191.05 218.67 195.62 213.72 199.74 209.28 203.44 205.27 206.82 201.62 209.9 198.3 212.72 195.25 215.31 192.44 217.71 189.85 219.91 187.47"/><polyline className="gridcls-4" points="72.95 283.3 78.72 278.85 95.5 265.89 109.66 254.95 121.77 245.6 132.26 237.5 141.42 230.43 149.49 224.21 156.65 218.67 163.04 213.74 168.79 209.29 173.99 205.28 178.72 201.63 183.03 198.3 186.97 195.25 190.6 192.45 193.96 189.86 197.05 187.48"/><polyline className="gridcls-4" points="35.9 270.54 43.62 265.91 61.83 254.97 77.41 245.61 90.88 237.52 102.66 230.45 113.04 224.21 122.23 218.68 130.46 213.74 137.87 209.3 144.54 205.29 150.62 201.64 156.16 198.31 161.23 195.26 165.91 192.46 170.22 189.87 174.19 187.48"/><polyline className="gridcls-4" points="151.34 187.48 151.33 187.49 146.47 189.87 141.2 192.46 135.5 195.27 129.29 198.32 122.53 201.64 115.1 205.29 106.93 209.31 97.89 213.75 87.83 218.69 76.58 224.22 63.9 230.46 49.52 237.53 34.96 244.68"/><polyline className="gridcls-4" points="34.31 226.65 40.13 224.23 53.42 218.71 65.31 213.76 76 209.31 85.65 205.3 94.43 201.65 102.43 198.32 109.76 195.28 116.5 192.47 122.73 189.88 128.47 187.49 128.48 187.49"/><polyline className="gridcls-4" points="105.62 187.49 105.6 187.49 98.98 189.88 91.79 192.47 84.02 195.28 75.56 198.33 66.32 201.66 56.19 205.31 45.06 209.32 33.83 213.37"/><polyline className="gridcls-4" points="33.47 203.17 38.23 201.66 48.68 198.33 58.27 195.28 67.08 192.49 75.23 189.89 82.74 187.51 82.76 187.5"/><polyline className="gridcls-4" points="59.91 187.51 51.53 189.9 42.42 192.49 33.18 195.12"/>
            </svg>
          </LazyLoad>
        </div>
      </div>
    )
  }
}