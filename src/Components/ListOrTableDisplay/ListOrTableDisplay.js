import React, { useState } from "react";

import "./ListOrTableDisplay.css";
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
        <div className="ListOrTableDisplay d-flex align-items-center ">
            <div
                className="me-2 ms-auto"
                onClick={() => {
                    displayTable();
                    props.isView();
                }}
            >
                <img
                    src={!props.isList ? TableIcon : TableIconUnactive}
                    alt="table"
                ></img>
            </div>
            <div
                onClick={() => {
                    displayList();
                    props.isView();
                }}
            >
                <img
                    src={props.isList ? ListIcon : ListIconUnActive}
                    alt="list"
                ></img>
            </div>
        </div>
    );
}
