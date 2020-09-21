import React, { Component } from "react";
import classes from "./Quiz.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz.js";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz.js";

class Quiz extends Component {
    state = {
        results: {}, //{[id]: success error}
        isQuizFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]:"success"/"error"}
        quiz: [
            {
                question: "What color is sky?",
                rightAnswerId: 3,
                questionId: 1,
                answers: [
                    { text: "Black", id: 1 },
                    { text: "Red", id: 2 },
                    { text: "Blue", id: 3 },
                    { text: "Lila", id: 4 },
                ],
            },
            {
                question: "Independent year of Ukraine",
                rightAnswerId: 2,
                questionId: 2,
                answers: [
                    { text: "2000", id: 1 },
                    { text: "1992", id: 2 },
                    { text: "1999", id: 3 },
                    { text: "3000", id: 4 },
                ],
            },
        ],
    };

    onAnswerClickHandler = answerId => {
        //prevent double clicking on right answer
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === "success") return;
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            //answer is right
            if (!results[question.questionId]) {
                results[question.questionId] = "success";
            }
            this.setState({
                answerState: { [answerId]: "success" },
                //results: results (save results in state)
                results,
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isQuizFinished: true,
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    });
                }

                window.clearTimeout(timeout);
            }, 200);

            //wrong answer
        } else {
            results[question.questionId] = "error";
            this.setState({
                answerState: { [answerId]: "error" },
                //results: results
                results,
            });
        }
        console.log(this.state.results);
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        //clear state to the begging
        this.setState({
            results: {},
            isQuizFinished: false,
            activeQuestion: 0,
            answerState: null,
        });
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer this Questions</h1>
                    {this.state.isQuizFinished ? (
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                    ) : (
                        <ActiveQuiz
                            question={
                                this.state.quiz[this.state.activeQuestion]
                                    .question
                            }
                            answers={
                                this.state.quiz[this.state.activeQuestion]
                                    .answers
                            }
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
