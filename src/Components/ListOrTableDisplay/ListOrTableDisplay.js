import React from "react";
import ListIcon from "../../images/list-icon.svg";
import ListIconUnActive from "../../images/list-icon-unactive.svg";
import TableIcon from "../../images/table-icon.svg";
import TableIconUnactive from "../../images/table-icon-unactive.svg";

export default function ListOrTableDisplay(props) {
  function displayList() {
    props.setIsList(true);
  }

  function displayTable() {
    props.setIsList(false);
  }

  return (
    <div className="d-flex ">
      <div className="me-2 ms-auto" onClick={displayList}>
        <img src={props.isList ? ListIcon : ListIconUnActive} alt="list"></img>
      </div>
      <div onClick={displayTable}>
        <img
          src={!props.isList ? TableIcon : TableIconUnactive}
          alt="table"
        ></img>
      </div>
    </div>
  );
}
