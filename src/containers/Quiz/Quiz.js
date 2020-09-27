import React, { Component } from "react";
import classes from "./Quiz.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz.js";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz.js";
// import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizById } from "../../store/actions/quiz";
import { connect } from 'react-redux';

class Quiz extends Component {
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
        this.props.fetchQuizById(this.props.match.params.id);
    }

    render() {
        return (
            <div className={ classes.Quiz }>
                <div className={ classes.QuizWrapper }>
                    <h1>Answer this Questions</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader />
                            : this.props.isFinished
                                ? <FinishedQuiz
                                    results={ this.props.results }
                                    quiz={ this.props.quiz }
                                    onRetry={ this.retryHandler }
                                />
                                : <ActiveQuiz
                                    question={ this.props.quiz[this.props.activeQuestion].question }
                                    answers={ this.props.quiz[this.props.activeQuestion].answers }
                                    onAnswerClick={ this.onAnswerClickHandler }
                                    quizLength={ this.props.quiz.length }
                                    answerNumber={ this.props.activeQuestion + 1 }
                                    state={ this.props.answerState }
                                />
                    }

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
