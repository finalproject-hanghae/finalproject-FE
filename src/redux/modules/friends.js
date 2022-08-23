import axios from "axios";

// Actions
const KEEP = "friend/KEEP";
const LOAD = "friend/LOAD";

const initialState = {
  friends: [],
};

export function keepFriendData(newFriend) {
  return { type: KEEP, friends: newFriend };
}

export function loadFriendData(myFriend) {
  return { type: LOAD, friends: myFriend };
}

//middlewares
export function loadFriendDataMW() {
  return function (dispatch) {
    let sessionStorage = window.sessionStorage;
    axios
      .get(process.env.REACT_APP_DB_HOST + "/friend", {
        headers: {
          authorization: sessionStorage.getItem("authorization"),
        },
      })
      .then((res) => {
        console.log(res.data)
        dispatch(loadFriendData(res.data));
      })
      .catch((err) => console.log(err));
  };
}

export const keepFriendDataMW = (username) => {
  return function (dispatch) {
    let sessionStorage = window.sessionStorage;
    axios({
      method: "post",
      url: process.env.REACT_APP_DB_HOST + "/friend",
      data: {
        friendname: username,
      },
      headers: {
        authorization: sessionStorage.getItem("authorization"),
      },
    })
      .then((res) => {
        dispatch(keepFriendData(username));
      })
      .catch((err) => console.log(err));
  };
};

export default function reducer(state = initialState, action = {}) {
  //매개변수에 값이 안들어오면 넣을 초기상태 값 -> 함수(state = {})
  //dispatch는 action함수에 접근하여 리턴값으로 reducer의 2번째 매개변수(action)를 제공
  switch (action.type) {
    case "friend/KEEP": {
      return { friends: [...state.friends, {nickname:action.friends}] };
    }
    case "friend/LOAD": {
      return { friends: [...action.friends] };
    }
    // do reducer stuff
    default:
      return state;
  }
}
