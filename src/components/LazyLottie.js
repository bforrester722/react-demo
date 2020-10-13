import React, {Component, lazy} from 'react';
import Lottie from 'react-lottie-light';

const LazyLoad = lazy(() => import('react-lazyload'));
class LazyLottie extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    animation: ''
  }

  // imports animation
  componentDidMount() {
    const {options} = this.props;
    import(`../animations/${options}.json`).then(animation => {
      this.setState({ animation })
    })
  }

  // sets up lottie animations
  lottieOptions(loop)  {
    return {
      animationData:  this.state.animation,
      loop:           loop,
    }
  };
    

  render() {

    const {width, height, speed, isPaused, loop, options}      = this.props;


    return (
     <LazyLoad height={height} offset={-200}>
        <Lottie isPaused={false}
                speed={speed}
                options={this.lottieOptions(loop)}
                height={height}
                width={width}/>
      </LazyLoad>

    );

  }

}

export default LazyLottie;