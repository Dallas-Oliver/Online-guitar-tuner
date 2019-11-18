import React from "react";

function Tuner(props) {
  return (
    <button className={props.className} onClick={props.playSound}>
      {props.note}
    </button>
  );
}
export default Tuner;
