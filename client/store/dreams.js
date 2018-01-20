import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
export const GET_DREAMS = "GET_DREAMS"; // GET
export const ADD_DREAM = "ADD_DREAM"; // POST

/**
 * ACTION CREATORS
 */
export const getDreams = dreams => ({ type: GET_DREAMS, dreams });
export const addDream = dream => ({ type: ADD_DREAM, dream });

/**
 * THUNK CREATORS
 */
export const fetchDreams = () => dispatch =>
  axios
    .get("/api/dreams")
    .then(res => res.data)
    .then(dreams => {
      const action = getDreams(dreams);
      dispatch(action);
    })
    .catch(err => console.log(err));

export const postDream = dream => dispatch =>
  axios
    .post("/api/dreams", dream)
    .then(res => res.data)
    .then(dream => {
      const action = addDream(dream);
      dispatch(action);
      console.log("saved dream!");
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_DREAMS:
      return action.dreams;

    case ADD_DREAM:
      return [...state, action.dream];

    default:
      return state;
  }
}
