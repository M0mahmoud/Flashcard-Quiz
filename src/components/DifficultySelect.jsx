import React from "react";

const DifficultySelect = ({ difficultyRef }) => {
  return (
    <div className="form-group">
      <label htmlFor="difficulty">Difficulty</label>
      <select id="difficulty" ref={difficultyRef}>
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelect;

/*
FlashCardForm

  const FormGroup = ({ label, input }) => (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      {input}
    </div>
  );

  const Select = ({ id, options, ref }) => (
    <select id={id} ref={ref}>
      {options}
    </select>
  );

  const Input = ({ id, type, min, max, step, defaultValue, ref }) => (
    <input
      type={type}
      id={id}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      ref={ref}
    />
  );

*/