import React from "react";
import FlashCard from "./FlashCard";

const FlashCardList = ({ flashcards }) => {
  return (
    <div className="container">
      <div className="card_grid">
        {flashcards.map((flashcard) => (
          <FlashCard flashcard={flashcard} key={flashcard.id} />
        ))}
      </div>
    </div>
  );
};

export default FlashCardList;
