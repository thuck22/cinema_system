import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginInterface from './login/login'
import HomePage from './users/home'

function User(props) {
  const [state, setState] = useState(props.getStateFromParent);
  return (
    <>
      <Header passState={state} setStateLogOut={props.setStateLogOut} />{" "}
      {/* Header luôn hiển thị trên mọi trang */}
      <Routes>
        {/* Định nghĩa đường dẫn gốc hiển thị trang chủ */}
        <Route
          path="/"
          exact
          element={state.isLoggedIn ? <HomePage /> : <LoginInterface />}
        />
      </Routes>
    </>
  );
}

function App() {
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
  });
  function loginSuccess(data) {
    console.log(data);
    setState({
      user: data,
      isLoggedIn: true,
    });
  }
  function getStateFromParent() {
    return state;
  }
  function setStateLogOut() {
    setState({
      user: null,
      isLoggedIn: false,
    });
  }
  return (
    // <Router>
    //   {state.isLoggedIn && state.user.role === "user" && (
    //     <User
    //       getStateFromParent={getStateFromParent}
    //       setStateLogOut={setStateLogOut}
    //     />
    //   )}
    //   {!state.isLoggedIn && <LoginInterface loginSuccess={loginSuccess} />}
    // </Router>
    <Router>

    </Router>
  );
}

export default App;
