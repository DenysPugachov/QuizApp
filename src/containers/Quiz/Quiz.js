import React, { Component } from "react";
import classes from "./Quiz.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz.js";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz.js";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        results: {}, //{[id]: success error}
        isQuizFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]:"success"/"error"}
        quiz: [],
        loading: true,
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

    async componentDidMount() {

        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false,
            });

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className={ classes.Quiz }>
                <div className={ classes.QuizWrapper }>
                    <h1>Answer this Questions</h1>

                    {
                        this.state.loading
                            ? <Loader />
                            : this.state.isQuizFinished
                                ? <FinishedQuiz
                                    results={ this.state.results }
                                    quiz={ this.state.quiz }
                                    onRetry={ this.retryHandler }
                                />
                                : <ActiveQuiz
                                    question={ this.state.quiz[this.state.activeQuestion].question }
                                    answers={ this.state.quiz[this.state.activeQuestion].answers }
                                    onAnswerClick={ this.onAnswerClickHandler }
                                    quizLength={ this.state.quiz.length }
                                    answerNumber={ this.state.activeQuestion + 1 }
                                    state={ this.state.answerState }
                                />
                    }

                </div>
            </div>
        );
    }
}

export default Quiz;
