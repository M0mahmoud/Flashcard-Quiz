import React, { useEffect, useRef, useState } from "react";

const FlashCard = ({ flashcard }) => {
  const backRef = useRef();
  const frontRef = useRef();
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const setMaxHeight = () => {
    const frontHeight = frontRef.current.getBoundingClientRect().height;
    const backHeight = backRef.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip((prev) => !prev)}
      style={{ height: height }}
    >
      <div className="front" ref={frontRef}>
        <div className="q-name"> {flashcard.question} </div>
        <ul className="options">
          {flashcard?.options.map((option) => (
            <li className="option" key={option}>
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="back" ref={backRef}>
        {flashcard.answer}
      </div>
    </div>
  );
};

export default FlashCard;
