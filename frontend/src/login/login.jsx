import "./login.css";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { handleLogin } from "../services/userService";
function LoginInterface(props) {
    // const [state, setState] = useState({
    //     username: "",
    //     password: "",
    //     invalid: false,
    //     errMessage: "",
    // });
    // function handleOnChangeUsername(e) {
    //     setState({
    //         ...state,
    //         username: e.target.value,
    //     });
    // }
    // function handleOnChangePassword(e) {
    //     setState({
    //         ...state,
    //         password: e.target.value,
    //     });
    // }
    // let handleUserLogin = async () => {
    //     try {
    //         if (!state.username || !state.password) {
    //             setState({
    //                 ...state,
    //                 invalid: true,
    //                 errMessage: "Fields cannot be empty",
    //             });
    //             return;
    //         }
    //         let data = await handleLogin(state.username, state.password);
    //         if (data && data.errCode !== 0) {
    //             setState({
    //                 ...state,
    //                 invalid: true,
    //                 errMessage: data.message,
    //             });
    //         }
    //         if (data && data.errCode === 0) {
    //             props.loginSuccess(data.user);
    //             setState({
    //                 username: "",
    //                 password: "",
    //                 invalid: false,
    //                 errMessage: "",
    //             });
    //             return <Navigate to="/" />;
    //         }
    //     } catch (error) {
    //         console.log("Error: ", error);
    //     }
    // };
    return (
        <div className="grid__full-width background">
            <div className="screen_left"></div>
            <div className="screen_right">
                <div className="login">
                    <div className="login_left">
                        <div className="login_left_contain_img">
                            <img
                                src={require("./img/hcmut.png")}
                                alt=""
                                className="login_left_img"
                            />
                        </div>
                        <p className="login_left_name">THƯ VIỆN BK</p>
                    </div>
                    <div className="login_right">
                        <p>Đăng nhập</p>
                        <ul className="input">
                            <li>Tên đăng nhập</li>
                            <li>
                                <input
                                    className="login_input"
                                    type="text"
                                    placeholder="Nhập tên đăng nhập"
                                // onChange={(event) => {
                                //     handleOnChangeUsername(event);
                                // }}
                                />
                            </li>
                            <li>Mật khẩu</li>
                            <li>
                                <input
                                    type="password"
                                    className="login_input"
                                    placeholder="Nhập mật khẩu"
                                // onChange={(event) => {
                                //     handleOnChangePassword(event);
                                // }}
                                />
                            </li>
                            <li className="forget_pass">
                                <a href="">Quên mật khẩu</a>
                            </li>
                            {state.invalid && (
                                <li className="wrong_info">
                                    <div>{state.errMessage}</div>
                                </li>
                            )}
                        </ul>
                        <div className="footer_login">
                            <button
                                className="login_button"
                                onClick={() => {
                                    handleUserLogin();
                                }}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginInterface;
