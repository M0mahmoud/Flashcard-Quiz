import { useState } from "react";

import "./App.css";
import FlashCardForm from "./components/FlashCardForm";
import FlashCardList from "./components/FlashCardList";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <FlashCardForm setLoading={setLoading} setFlashcards={setFlashcards} />
      <FlashCardList flashcards={flashcards} />
      {flashcards.length == 0 && (
        <div className="before">
          <h3>
            {!loading
              ? "Chose Category And Number Of Questions"
              : "Generating Your Questions..."}
          </h3>
        </div>
      )}
    </>
  );
}

export default App;
