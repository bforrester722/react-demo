import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const LazyLottie = lazy(() => import("../components/LazyLottie"));

const HomePage = () => {
  const [dimensions, setDimensions] = useState("150px");

  // Function to check screen width and update dimensions
  const checkWidth = () => {
    const match = window.matchMedia("(min-width: 768px)");
    setDimensions(match.matches ? "350px" : "150px");
  };

  // Effect to handle screen resizing
  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  // Helper functions for dynamic dimension setting
  const setReactDimensions = () => {
    const { width } = window.screen;
    return width > 1200 ? 1200 : width;
  };

  const setLighthouseDimensions = (dimension) => {
    const { width } = window.screen;
    if (dimension === "width") {
      return width > 568 ? 568 : width - 32;
    }
    return width > 568 ? 400 : width - 132;
  };

  return (
    <div className="home-page">
      <div className="img-animation-wrapper">
        <div id="react-lottie-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLottie
              height={setReactDimensions()}
              loop={false}
              options="react2"
              speed={1}
              width={setReactDimensions()}
            />
          </Suspense>
        </div>
      </div>

      <section className="home-main-txt-wrapper">
        <p className="home-main-txt">
          Since a lot of employers are looking for developers with React
          experience, I thought it best to start and learn it. That is where
          this project comes in, made with React and Firebase. This is very much
          a work in progress I started at around 8-1-2020. I will remedy issues
          as I continue to learn best practices. All known issues I put on the
          README at{" "}
          <a
            rel="noreferrer"
            className="link"
            target="_blank"
            href="https://github.com/bforrester722/react-demo"
          >
            my github
          </a>
          .
        </p>
      </section>

      <div className="home-grid">
        <section className="section-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLottie
              height={dimensions}
              options="vader"
              speed={0.6}
              width={dimensions}
            />
          </Suspense>
          <Link to="/Lego" className="link">
            <h2>Lego</h2>
          </Link>
          <ul>
            <li>
              Fetches a random Star Wars character from https://swapi.dev/
            </li>
            <li>Uses data to edit minifigure</li>
            <li>Handles receiving 404 from API</li>
            <li>
              Showcases working with API, Data, CSS, and Adobe Illustrator
            </li>
          </ul>
        </section>

        <section className="section-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLottie
              options="chat test"
              height={dimensions}
              speed={0.9}
              width={parseInt(dimensions) + 32 + "px"}
            />
          </Suspense>
          <h2>
            <Link to="/Chat" className="link">
              Chat
            </Link>
          </h2>
          <ul>
            <li>
              Allows users to sign up and login with email, Google account, or
              Facebook
            </li>
            <li>
              Showcases working Firebase Login and Firebase Realtime Database
            </li>
          </ul>
        </section>

        <section className="section-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLottie
              options="scores"
              height={setLighthouseDimensions("height")}
              speed={0.9}
              width={setLighthouseDimensions("width")}
            />
          </Suspense>
          <h2 className="home-header">Mobile Lighthouse Scores</h2>
          <ul>
            <li>
              Google Lighthouse is an open-source, automated tool for measuring
              the quality of web pages
            </li>
            <li>These are the scores as 10/8</li>
          </ul>
        </section>
      </div>

      <div className="synth-grid-wrapper">
        <Suspense fallback={<div>Loading SVG...</div>}>
          <svg
            id="Layer_1"
            className="synth-grid"
            data-name="Layer 1"
            viewBox="0 0 551 285.14"
          >
            {/* SVG content */}
          </svg>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
