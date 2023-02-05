import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import DifficultySelect from "./DifficultySelect";

const FlashCardForm = ({ setFlashcards, setLoading, setError }) => {
  const [categories, setCategories] = useState();
  const categoryRef = useRef();
  const difficultyRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!categories.length) return;

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get("https://opentdb.com/api.php?", {
        params: {
          amount: amountRef.current.value,
          category: categoryRef.current.value,
          difficulty: difficultyRef.current.value,
        },
      });

      if (!data.results.length) {
        setError("No Questions Founded...");
        setFlashcards([]);
        return;
      }
      setFlashcards(
        data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now}`,
            question: decodeString(questionItem.question),
            options: options.sort(() => Math.random() - 0.5),
            answer,
          };
        })
      );
      if (res.data.results.length === 0) setError("No Questions Founded...");
    } catch (error) {
      setError("An error occured, please try again later");
    }

    setLoading(false);
    setError("");
  };

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  return (
    <form onSubmit={submitHandler} className="header">
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryRef}>
          {categories?.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Number of Questions</label>
        <input
          type="number"
          id="amount"
          min={"5"}
          step={"5"}
          max={"50"}
          defaultValue={10}
          ref={amountRef}
        />
      </div>
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" ref={difficultyRef}>
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="form-group">
        <button className="btn">Generate</button>
      </div>
    </form>
  );
};

export default FlashCardForm;
