import React, { useState, useEffect, lazy, Suspense } from "react";
import { wait } from "../helpers/utils";
import { Button } from "@mui/material";
import vader from "./vader.mp3";
import "./lego.css";
import "./faces.css";

const Hair = lazy(() => import("./Hair"));
const Face = lazy(() => import("./Face"));
const Body = lazy(() => import("./Body"));
const Legs = lazy(() => import("./Legs"));

const renderLoader = () => <p>Loading...</p>;

const Lego = ({ onHeaderTitle }) => {
  const [body, setBody] = useState(0);
  const [character, setCharacter] = useState({ name: "...Loading" });
  const [face, setFace] = useState(0);
  const [hair, setHair] = useState(0);
  const [leg, setLeg] = useState(0);
  const [opacity, setOpacity] = useState(".5");
  const [textIn, setTextIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const colorCorrections = {
    auburn: "#922724",
    black: "#232323",
    blond: "gold",
    blonde: "gold",
    brown: "saddlebrown",
    dark: "#42210B",
    fair: "bisque",
    hazel: "radial-gradient(yellow, #594c26 )",
    light: "navajowhite",
    metal: "silver",
    pale: "bisque",
    unknown: "brown",
    white: "#ddd6de",
    none: "saddlebrown",
    "green-tan": "green",
  };

  useEffect(() => {
    onHeaderTitle("Lego");
    fetchRandomCharacter();
  }, []); // Run on mount only

  useEffect(() => {
    translateCharOptions();
  }, [face, hair, body, leg]);

  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const fetchRandomCharacter = async () => {
    setLoading(true);
    setTextIn(false);
    const rand = getRandomNum(1, 85);
    try {
      const response = await fetch(`https://swapi.dev/api/people/${rand}/`);
      const data = await response.json();
      updateCharacter(data);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  const updateCharacter = async (char) => {
    await wait(750);
    if (char.name === "Darth Vader") {
      setVader(char);
      return;
    }

    if (char.detail === "Not found") {
      setCharacter({
        name: "Not Found",
        hair_color: "blond",
        skin_color: "fair",
      });
      setBody(500);
      setFace(500);
      setHair(700);
      setLeg(500);
      setOpacity("1");
      setTextIn(true);
    } else {
      const isBald = char.hair_color === "none" || char.hair_color === "n/a";
      setCharacter(char);
      setBody(getRandomNum(1, 4) * 100);
      setFace(getRandomNum(1, 5) * 100);
      setHair(isBald ? 0 : getRandomNum(2, 6) * 100);
      setLeg(getRandomNum(1, 4) * 100);
      setOpacity("1");
      setTextIn(true);
    }
    translateCharOptions();
  };

  const setVader = (char) => {
    setCharacter(char);
    setBody(400);
    setFace(400);
    setHair(600);
    setLeg(400);
    setOpacity("1");
    setTextIn(true);
    translateCharOptions();

    const audio = new Audio(vader);
    audio.volume = 0.5;
    audio.play();
  };

  const translateCharOptions = () => {
    const featuresArray = [
      { wrapper: "hair-styles", item: hair },
      { wrapper: "faces", item: face },
      { wrapper: "bodies", item: body },
      { wrapper: "legs", item: leg },
    ];

    featuresArray.forEach((feature) => {
      const item = document.querySelector(`.${feature.wrapper}`);
      if (item) {
        item.style.transform = `translateX(-${feature.item}%)`;
      }
    });
    setLoading(false);
  };

  const getCorrectedColor = (color) => {
    const removeMottle = color.replace("mottled", "").replace("mottle", "");
    return colorCorrections[removeMottle] || removeMottle;
  };

  const getColor = (type) => {
    const color = character[type];
    if (!color) return "aqua";

    if (color.includes(",")) {
      const colorArr = color.split(",");
      const getThirdColor = () => (colorArr[2] ? colorArr[2] : colorArr[0]);

      return {
        color1: getCorrectedColor(colorArr[0]),
        color2: getCorrectedColor(colorArr[1]),
        color3: getCorrectedColor(getThirdColor()),
      };
    }
    return getCorrectedColor(color);
  };

  const getSize = () => {
    const { height } = character;
    if (!height) return { transform: "scale(.5)" };

    const xMulti = height / 170 - 0.5;
    const x = Math.max(0.35, Math.min(0.6, xMulti));
    return { transform: `scale(${x})` };
  };

  return (
    <Suspense fallback={renderLoader()}>
      <div className="lego-page">
        <div className="lego-info-wrapper">
          <div className="minifigure-wrapper">
            <h2
              className={
                textIn ? "textIn + minifigure-name" : "minifigure-name"
              }
            >
              {loading ? "Loading..." : character.name}
            </h2>
            <div className="minifigure" style={getSize()}>
              <div className="head">
                <Face
                  skinColor={getColor("skin_color")}
                  eyeColor={getColor("eye_color")}
                  opacity={opacity}
                />
                <div className="hairs">
                  <Hair
                    hairColor={getColor("hair_color")}
                    skinColor={getColor("skin_color")}
                    opacity={opacity}
                  />
                </div>
              </div>
              <Body skinColor={getColor("skin_color")} opacity={opacity} />
              <div className="lower">
                <Legs skinColor={getColor("skin_color")} opacity={opacity} />
              </div>
            </div>
          </div>

          <div className="controls">
            <fieldset>
              <div>
                <label htmlFor="hair">
                  Hair
                  <input
                    onChange={(event) => setHair(event.target.value)}
                    name="hair"
                    type="range"
                    min="0"
                    max="600"
                    step="100"
                    value={hair}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="face">
                  Face
                  <input
                    onChange={(event) => setFace(event.target.value)}
                    name="face"
                    type="range"
                    min="0"
                    max="400"
                    step="100"
                    value={face}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="body">
                  Body
                  <input
                    onChange={(event) => setBody(event.target.value)}
                    name="body"
                    type="range"
                    min="100"
                    max="400"
                    step="100"
                    value={body}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="legs">
                  Legs
                  <input
                    onChange={(event) => setLeg(event.target.value)}
                    name="legs"
                    type="range"
                    min="100"
                    max="400"
                    step="100"
                    value={leg}
                  />
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  disabled={loading}
                  onClick={fetchRandomCharacter}
                  sx={{
                    textTransform: "none", // Prevents all caps by default in MUI buttons
                  }}
                >
                  {loading ? "...Loading" : "New Character"}
                </Button>
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
    </Suspense>
  );
};

export default Lego;
