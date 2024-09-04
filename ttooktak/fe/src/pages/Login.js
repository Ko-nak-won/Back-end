import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/login";

import MainIcon from '../components/MainIcon';

import './Login.css';

export default function Login(){
    const navigate = useNavigate(); // useNavigate 훅 사용
    const user = useUser();
    
    const [id, setId] = useState('');

    const handleMembershipClick = () => {
        navigate('/make-membership'); // MakingMembership 페이지로 이동
    };

    const handleLogin = () => {
        user.setLogin(id);
        navigate('/');
    };

    return (
        <div className="LoginPageStart">
            <div className="loginBg">
                <div className="logo">
                    <MainIcon/>
                </div>
                <div className="loginWindow">
                    <form action="">
                        <p>로그인</p>
                        <div className="loginId">
                            <input type="text" placeholder="아이디" value={id} onInput={e => setId(e.target.value)}/>
                        </div>
                        <div className="loginPassword">
                            <input type="password" placeholder="비밀번호"/>
                        </div>
                        <div className="loginBtn">
                            <button onClick={handleLogin}>로그인하기</button>
                        </div>
                    </form>
                    <div className="membership">
                        <p>아이디가 없으신가요?</p>
                        <button onClick={handleMembershipClick}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}