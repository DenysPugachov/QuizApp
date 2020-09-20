import React from "react";
import classes from "./ActiveQuiz.scss";
import AnswersList from "./AnswersList/AnswersList.js";

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp; {props.question}
            </span>
            <small>
                {props.answerNumber} to {props.quizLength}
            </small>
        </p>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
);

export default ActiveQuiz;
