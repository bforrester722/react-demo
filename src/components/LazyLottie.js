import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import Lottie from "lottie-light-react";

const LazyLottie = ({ options, width, height, speed, isPaused, loop }) => {
  const [animation, setAnimation] = useState(null);

  // Load animation JSON dynamically when the component mounts
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const animationData = await import(`../animations/${options}.json`);
        setAnimation(animationData.default || animationData); // Handle default export
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    loadAnimation();
  }, [options]); // Re-run if `options` prop changes

  // If animation data isn't loaded yet, render a placeholder or loader
  if (!animation) {
    return <div style={{ width, height, textAlign: "center" }}>Loading...</div>;
  }

  return (
    <Lottie
      animationData={animation} // Provide loaded animation data
      loop={loop} // Enable or disable looping
      speed={speed} // Animation playback speed
      play={!isPaused} // Whether to play or pause the animation
      style={{ width, height }} // Apply width and height as inline styles
    />
  );
};

const LazyLottieWrapper = (props) => {
  return (
    <Suspense fallback={<div>Loading animation...</div>}>
      <LazyLottie {...props} />
    </Suspense>
  );
};

export default LazyLottieWrapper;
