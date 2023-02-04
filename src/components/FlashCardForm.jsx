import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const FlashCardForm = ({ setFlashcards, setLoading }) => {
  const [categories, setCategories] = useState();
  const categoryEl = useRef();
  const amountRef = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get("https://opentdb.com/api.php?", {
        params: {
          amount: amountRef.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        console.log("res.data.results", res.data.results);
        setFlashcards(
          res.data.results.map((questionItem, index) => {
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
      });
    setLoading(fasle);
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
        <select id="category" ref={categoryEl}>
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
        <button className="btn">Generate</button>
      </div>
    </form>
  );
};

export default FlashCardForm;
