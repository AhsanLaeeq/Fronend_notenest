import React from 'react';

export default function Alert(props) {
  const capt = (word) => {
    if (word === "danger") {
      word = "error";  // Change "danger" to "error"
    }
    return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter
  };

  return (
    props.alert && (
      <div className={`alert alert-${props.alert.type}`} role="alert">
        <strong>{capt(props.alert.type)}</strong>: {props.alert.message}
      </div>
    )
  );
}
