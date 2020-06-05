import React from "react";

function Item(props) {
  return (
    <span
      className="badge badge-danger badge-sm"
      style={{ margin: "1px", width: "auto", fontSize: "1em" }}
    >
      <span>{props.item.name}</span>
      <a onClick={props.onDelete} className="text-light" role="link">
        &times;
      </a>
    </span>
  );
}

Item.propTypes = {};

export default Item;
