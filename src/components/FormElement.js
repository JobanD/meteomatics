import React from "react";

export default function FormElement(props) {
  return (
    <div className="formElement">
      <label>{props.label}</label>
      <input
        type="text"
        name={props.name}
        {...register({props.name}, {
          required: true,
        })}
      />
      {errors.latitude?.type === "required" && (
        <p className="errorMessage">Latitude is required.</p>
      )}
    </div>
  );
}
