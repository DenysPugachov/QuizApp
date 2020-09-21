import React from "react";
import classes from "./FinishedQuiz.scss";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === "success") {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizQuestionItem, index) => {
                    const cls = [
                        "fa",
                        props.results[quizQuestionItem.questionId] === "error"
                            ? "fa-times"
                            : "fa-check",
                        classes[props.results[quizQuestionItem.questionId]],
                    ];

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizQuestionItem.question}
                            <i className={cls.join(" ")}></i>
                        </li>
                    );
                })}
            </ul>

            <p>
                {successCount} form {props.quiz.length}
            </p>

            <div>
                <button onClick={props.onRetry}>repeat quiz</button>
            </div>
        </div>
    );
};

export default FinishedQuiz;
