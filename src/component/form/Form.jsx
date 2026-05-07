import React from "react";

const Form = ({ data, handleChange }) => {
  return (
    <>
      {data.map((input, index) => (
        <div className="form-group" key={index}>
          <label className="form-label">{input.name}</label>
          <input
            type={input.type}
            name={input.name}
            value={input.value}
            onChange={handleChange}
            className="form-input"   // ✅ IMPORTANT
            placeholder={`Enter ${input.name}`}
          />
        </div>
      ))}
    </>
  );
};

export default Form;