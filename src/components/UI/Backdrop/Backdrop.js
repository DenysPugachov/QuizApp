import React from "react";
import classes from "./Backdrop.scss";

const Backdrop = props => (
    <div className={classes.Backdrop} onClick={props.onClick}></div>
);
export default Backdrop;
