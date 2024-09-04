import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 네비게이션을 위해 useNavigate import
import { useUser } from '../utils/login';

import MainIcon from '../components/MainIcon';

import './MakingMembership.css';

export default function Membership() {
    const navigate = useNavigate(); // 페이지 이동을 위한 hook
    const user = useUser();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [agreeTerms, setAgreeTerms] = useState({ term1: false, term2: false, term3: false, term4: false });
    const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
    const [isSignupButtonEnabled, setIsSignupButtonEnabled] = useState(false);
    const [activeStep, setActiveStep] = useState(1);

    // Step 1 입력 필드 값 검증
    useEffect(() => {
        setIsNextButtonEnabled(
            name !== '' &&
            phoneNumber !== '' &&
            address !== '' &&
            selectedYear !== '' &&
            selectedMonth !== '' &&
            selectedDay !== ''
        );
    }, [name, phoneNumber, address, selectedYear, selectedMonth, selectedDay]);

    // Step 2 입력 필드 및 체크박스 값 검증
    useEffect(() => {
        const allAgreed = Object.values(agreeTerms).every(Boolean);
        setIsSignupButtonEnabled(
            userId !== '' &&
            nickname !== '' &&
            password !== '' &&
            passwordConfirm !== '' &&
            password === passwordConfirm &&
            allAgreed
        );
    }, [userId, nickname, password, passwordConfirm, agreeTerms]);

    const handleInputChange = (event, setter) => {
        const { value } = event.target;
        if (setter === setPhoneNumber) {
            const filteredValue = value.replace(/[^0-9]/g, '');
            setter(filteredValue);
        } else {
            setter(value);
        }
    };

    const handleYearChange = (e) => setSelectedYear(e.target.value);
    const handleMonthChange = (e) => setSelectedMonth(e.target.value);
    const handleDayChange = (e) => setSelectedDay(e.target.value);
    const handleNextClick = () => {
        if (activeStep < 3) {
            setActiveStep(prevStep => prevStep + 1);
        }
    };
    const handleCheckboxChange = (term) => (event) => {
        setAgreeTerms(prevTerms => ({
            ...prevTerms,
            [term]: event.target.checked
        }));
    };
    
    useEffect(() => {
        user.setLogin(nickname);
    }, [nickname]);

    const handleStartClick = () => {
        navigate('/index'); // '/index'로 이동
    };

    return (
        <div className='body'>
            <div className={`membershipStart ${activeStep === 1 ? 'membershipOn' : ''}`}>
                <div className="membershipBg">
                    <div className="logo">
                        <MainIcon />
                    </div>
                    <div className="membershipWindow">
                        <form>
                            <p>회원가입</p>
                            <input type="text" placeholder='이름' value={name} onChange={event => handleInputChange(event, setName)} />
                            <input type="text" placeholder='전화번호' value={phoneNumber} onChange={event => handleInputChange(event, setPhoneNumber)} />
                            <div className="birth">
                                <select value={selectedYear} onChange={handleYearChange} required>
                                    <option value="">연도</option>
                                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                                </select>
                                <select value={selectedMonth} onChange={handleMonthChange} required>
                                    <option value="">월</option>
                                    {months.map(month => <option key={month} value={month}>{month}</option>)}
                                </select>
                                <select value={selectedDay} onChange={handleDayChange} required>
                                    <option value="">일</option>
                                    {days.map(day => <option key={day} value={day}>{day}</option>)}
                                </select>
                            </div>
                            <input type="text" placeholder='주소' value={address} onChange={event => handleInputChange(event, setAddress)} />
                            <button type="button" onClick={handleNextClick} disabled={!isNextButtonEnabled}>다음</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`membershipStart ${activeStep === 2 ? 'membershipOn' : ''}`}>
                <div className="membershipBg">
                    <div className="logo">
                        <MainIcon />
                    </div>
                    <div className="membershipWindow">
                        <form>
                            <p>회원가입</p>
                            <input type="text" placeholder='아이디' value={userId} onChange={event => handleInputChange(event, setUserId)} />
                            <input type="text" placeholder='닉네임' value={nickname} onChange={event => handleInputChange(event, setNickname)} />
                            <input type="password" placeholder='비밀번호' value={password} onChange={event => handleInputChange(event, setPassword)} />
                            <input type="password" placeholder='비밀번호 확인' value={passwordConfirm} onChange={event => handleInputChange(event, setPasswordConfirm)} />
                            <div className="membershipSelectBox">
                                {Object.keys(agreeTerms).map((term, index) => (
                                    <p key={index}>
                                        <input
                                            type="checkbox"
                                            checked={agreeTerms[term]}
                                            onChange={handleCheckboxChange(term)}
                                        /> 사이트 이용약관 동의<span>(보기)</span>
                                    </p>
                                ))}
                            </div>
                            <button type="button" onClick={handleNextClick} disabled={!isSignupButtonEnabled}>회원가입하기</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`membershipStart ${activeStep === 3 ? 'membershipOn' : ''}`}>
                <div className="membershipBg">
                    <div className="logo">
                        <MainIcon />
                    </div>
                    <div className="membershipWindow">
                        <form>
                            <svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.9167 42.9167L46.4792 22.3542L42.3959 18.2708L25.9167 34.75L17.6042 26.4375L13.5209 30.5208L25.9167 42.9167ZM30 58.6667C25.9653 58.6667 22.1737 57.9006 18.625 56.3683C15.0764 54.8361 11.9896 52.7585 9.36463 50.1354C6.73963 47.5124 4.66199 44.4256 3.13171 40.875C1.60143 37.3244 0.835322 33.5328 0.833378 29.5C0.831433 25.4672 1.59754 21.6756 3.13171 18.125C4.66588 14.5744 6.74352 11.4876 9.36463 8.86458C11.9857 6.24152 15.0725 4.16388 18.625 2.63166C22.1775 1.09944 25.9692 0.333328 30 0.333328C34.0309 0.333328 37.8225 1.09944 41.375 2.63166C44.9275 4.16388 48.0144 6.24152 50.6355 8.86458C53.2566 11.4876 55.3352 14.5744 56.8713 18.125C58.4074 21.6756 59.1725 25.4672 59.1667 29.5C59.1609 33.5328 58.3948 37.3244 56.8684 40.875C55.342 44.4256 53.2644 47.5124 50.6355 50.1354C48.0066 52.7585 44.9198 54.8371 41.375 56.3712C37.8303 57.9054 34.0387 58.6706 30 58.6667Z" fill="#A5C2B5"/>
                            </svg>
                            <p>회원가입 완료</p>
                            <div className="membershipFinish">
                                <p>{nickname}님</p>
                                <p>환영합니다!</p>
                                <p>이제 원하는 영상의 자막을</p>
                                <p>‘뚝딱’ 만들어보세요!</p>
                            </div>
                            <button type="button" onClick={handleStartClick}>뚝딱이 시작하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}