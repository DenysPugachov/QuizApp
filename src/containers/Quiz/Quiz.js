import React, { Component } from "react";
import classes from "./Quiz.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz.js";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null, //{[id]:"success"/"error"}
        quiz: [
            {
                question: "What color is sky?",
                rightAnswerId: 3,
                id: 1,
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
                id: 2,
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
        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId) {
            //answer is right
            this.setState({
                answerState: { [answerId]: "success" },
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log("This Quiz is finished!");
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    });
                }

                window.clearTimeout(timeout);
            }, 500);

            //wrong answer 
        } else {
            this.setState({
                answerState: { [answerId]: "error" },
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer this Questions</h1>
                    <ActiveQuiz
                        question={
                            this.state.quiz[this.state.activeQuestion].question
                        }
                        answers={
                            this.state.quiz[this.state.activeQuestion].answers
                        }
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        );
    }
}

export default Quiz;
