import React, { Component } from "react";
import classes from "./QuizCreator.scss";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import { createControl, validate, validateForm } from "../../form/formFramework.js";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select.js";

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

export default class QuizCreator extends Component {
    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls(),
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        //clone quiz from state (prevent mutation)
        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        //destructuring
        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]
        };
        //add new question to quiz
        quiz.push(questionItem);

        this.setState({
            quiz,
            //return state to begin
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls(),

        });
    };

    createQuizHandler = (event) => {
        event.preventDefault();
        console.log(this.state.quiz);
        //TODO: SERVER
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
                            disabled={ this.state.quiz.length === 0 }
                        >
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
