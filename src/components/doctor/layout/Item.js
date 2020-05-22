import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Item(props) {
  return (
    <span
      className="badge badge-danger badge-sm"
      style={{ margin: "1px", width: "auto", fontSize: "1em" }}
    >
      <span>{props.item.name}</span>
      <a onClick={props.onDelete} className="text-light" role="link">
        {" "}
        &times;
      </a>
    </span>
  );
}

Item.propTypes = {};

export default Item;
