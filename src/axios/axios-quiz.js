import axios from "axios";

export default axios.create({
    baseURL: "https://react-quiz-52580.firebaseio.com/"
});