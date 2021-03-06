import React, { Component } from "react";
import classes from "./QuizCreator.scss";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import { createControl, validate, validateForm } from "../../form/formFramework.js";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select.js";
import { createQuizQuestion, finishCreateQuiz } from './../../store/actions/create';
import { connect } from 'react-redux';

function createOptionControl(number) {
    return createControl({
        label: `Variant ${number}`,
        errorMessage: "Question can't be empty!",
        id: number,
    }, { required: true });
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: "Enter question",
                errorMessage: "Question can't be empty!",
            },
            { required: true },
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

class QuizCreator extends Component {
    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls(),
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        //destructuring
        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            //return state to begin
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls(),

        });
    };

    createQuizHandler = event => {
        event.preventDefault();

        //return state to begin
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
        this.props.finishCreateQuiz();
    };

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);


        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls),
        });
    };

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={ controlName + index }>
                    <Input
                        label={ control.label }
                        value={ control.value }
                        valid={ control.valid }
                        shouldValidate={ !!control.validation }//!! => make boolean type from
                        touched={ control.touched }
                        errorMessage={ control.errorMessage }
                        onChange={ event => this.changeHandler(event.target.value, controlName) }
                    />
                    {/* //Draw horizontal line */ }
                    { index === 0 ? <hr /> : null }
                </Auxiliary>
            );
        });
    }
    selectChangedHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value,
        });
    };

    render() {
        const select = <Select
            label="Choose right answer"
            value={ this.state.rightAnswerId }
            onChange={ this.selectChangedHandler }
            options={ [
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
            ] }
        />;

        return (
            <div className={ classes.QuizCreator }>
                <div>
                    <h1>Create Test</h1>

                    <form onSubmit={ this.submitHandler }>
                        { this.renderControls() }

                        { select }

                        <Button
                            type="primary"
                            onClick={ this.addQuestionHandler }
                            disabled={ !this.state.isFormValid }
                        >
                            Add Question
                        </Button>
                        <Button
                            type="success"
                            onClick={ this.createQuizHandler }
                            disabled={ this.props.quiz.length === 0 }
                        >
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);