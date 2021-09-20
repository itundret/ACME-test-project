import axios from "axios";

export default axios.create({
  baseURL: "http://delivery.chalk247.com/",
  headers: {
    "Content-type": "application/json"
  }
});