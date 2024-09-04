import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../utils/login';

import MainIcon from './MainIcon';

import HeaderStyle from './Header.css';


export default function Header() {
	const navigate = useNavigate();
	const user = useUser();

	// 프로필 클릭 핸들러
	const handleProfileClick = (e) => {
		if (!user.hadLogin()) {
			e.preventDefault(); // 현재 링크 동작을 막음
			navigate('/login'); // 로그인 페이지로 이동
		} else {
			user.setLogout();
			navigate('/');
		}
	};
	
	return(
		<div className="header" style={HeaderStyle}>
			<NavLink to="/">
				<MainIcon/>
			</NavLink>
			<nav className='mainMenu'>
				<ul>
					<li><NavLink to="/information" className={({ isActive }) => isActive ? 'activePage' : ''}>뚝딱이 소개</NavLink></li>
					<li><NavLink to="/translate" className={({ isActive }) => isActive ? 'activePage' : ''}>번역하기</NavLink></li>
					<li><NavLink to="/edit-profile" className={({ isActive }) => isActive ? 'activePage' : ''}>정보수정</NavLink></li>
					{/* <li><Link to="/edit-profile" hidden={user.hadLogin() === false}>마이페이지</Link></li> */}
				</ul>
			</nav>
			<div className="myBox">
				<div className="bell">
					<NavLink to="#">
						<svg width="36" height="45" viewBox="0 0 36 45">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M18 45C17.9979 45 17.9958 45 17.9937 45C16.7574 45 15.6998 44.5598 14.8207 43.6793C13.942 42.799 13.5017 41.7416 13.5 40.5073C13.5 40.5048 13.5 40.5024 13.5 40.5H22.5C22.5 41.7375 22.0597 42.7973 21.1793 43.6793C20.2987 44.5613 19.239 45.0015 18 45ZM31.5 18V20.25V33.75H36V38.25H0V33.75H4.5L4.5 18C4.5 14.8875 5.4375 12.1223 7.3125 9.70426C9.1875 7.28626 11.625 5.70151 14.625 4.95001L14.625 4.10626L14.625 3.37501C14.625 3.37491 14.625 3.37481 14.625 3.37471C14.6221 2.44034 14.9498 1.64394 15.6083 0.985505C16.2668 0.327005 17.064 -0.00149489 18 5.11364e-06C18.0018 8.04333e-06 18.0037 1.22204e-05 18.0055 1.76449e-05C18.9391 -0.000185135 19.7345 0.328299 20.3917 0.985513C21.0502 1.64401 21.378 2.44051 21.375 3.37501V4.10626V4.95001C24.375 5.70151 26.8125 7.28626 28.6875 9.70426C30.5625 12.1223 31.5 14.8875 31.5 18ZM20.2494 9.26644C21.7843 9.64833 23.1533 10.4408 24.3563 11.6438C26.1187 13.4063 27 15.525 27 18V19.2938V33.75H9V19.2938L9 18C9 15.525 9.88125 13.4063 11.6437 11.6438C12.8467 10.4408 14.2157 9.64834 15.7506 9.26645C15.7504 9.27138 15.7502 9.27632 15.75 9.28126C16.125 9.20626 16.491 9.14026 16.848 9.08326C17.1072 9.04187 17.3806 9.01591 17.6683 9.00536C17.7781 9.00179 17.8887 9.00001 18 9.00001C18.1101 9.00001 18.2194 9.00175 18.328 9.00523C18.6171 9.0157 18.8917 9.0417 19.152 9.08326C19.509 9.14026 19.875 9.20626 20.25 9.28126C20.2498 9.27632 20.2496 9.27138 20.2494 9.26644Z" fill="#6B7072"/>
						</svg>
					</NavLink>
				</div>
				<div className="profile">
					<NavLink to="#" onClick={handleProfileClick}>
						<svg width="36" height="36" viewBox="0 0 36 36">
							<path d="M6.93 27.18C8.46 26.01 10.17 25.0878 12.06 24.4134C13.95 23.739 15.93 23.4012 18 23.4C20.07 23.3988 22.05 23.7366 23.94 24.4134C25.83 25.0902 27.54 26.0124 29.07 27.18C30.12 25.95 30.9378 24.555 31.5234 22.995C32.109 21.435 32.4012 19.77 32.4 18C32.4 14.01 30.9978 10.6122 28.1934 7.80659C25.389 5.001 21.9912 3.5988 18 3.6C14.0088 3.6012 10.611 5.004 7.8066 7.80839C5.0022 10.6128 3.6 14.01 3.6 18C3.6 19.77 3.8928 21.435 4.4784 22.995C5.064 24.555 5.8812 25.95 6.93 27.18ZM18 19.8C16.23 19.8 14.7372 19.1928 13.5216 17.9784C12.306 16.764 11.6988 15.2712 11.7 13.5C11.7012 11.7288 12.309 10.236 13.5234 9.02159C14.7378 7.80719 16.23 7.2 18 7.2C19.77 7.2 21.2628 7.80779 22.4784 9.02339C23.694 10.239 24.3012 11.7312 24.3 13.5C24.2988 15.2688 23.6916 16.7616 22.4784 17.9784C21.2652 19.1952 19.7724 19.8024 18 19.8ZM18 36C15.51 36 13.17 35.5272 10.98 34.5816C8.79 33.636 6.885 32.3538 5.265 30.735C3.645 29.1162 2.3628 27.2112 1.4184 25.02C0.474002 22.8288 0.00120228 20.4888 2.27848e-06 18C-0.00119772 15.5112 0.471602 13.1712 1.4184 10.98C2.3652 8.78879 3.6474 6.8838 5.265 5.265C6.8826 3.6462 8.7876 2.364 10.98 1.4184C13.1724 0.4728 15.5124 0 18 0C20.4876 0 22.8276 0.4728 25.02 1.4184C27.2124 2.364 29.1174 3.6462 30.735 5.265C32.3526 6.8838 33.6354 8.78879 34.5834 10.98C35.5314 13.1712 36.0036 15.5112 36 18C35.9964 20.4888 35.5236 22.8288 34.5816 25.02C33.6396 27.2112 32.3574 29.1162 30.735 30.735C29.1126 32.3538 27.2076 33.6366 25.02 34.5834C22.8324 35.5302 20.4924 36.0024 18 36ZM18 32.4C19.59 32.4 21.09 32.1678 22.5 31.7034C23.91 31.239 25.2 30.5712 26.37 29.7C25.2 28.83 23.91 28.1628 22.5 27.6984C21.09 27.234 19.59 27.0012 18 27C16.41 26.9988 14.91 27.2316 13.5 27.6984C12.09 28.1652 10.8 28.8324 9.63 29.7C10.8 30.57 12.09 31.2378 13.5 31.7034C14.91 32.169 16.41 32.4012 18 32.4ZM18 16.2C18.78 16.2 19.425 15.945 19.935 15.435C20.445 14.925 20.7 14.28 20.7 13.5C20.7 12.72 20.445 12.075 19.935 11.565C19.425 11.055 18.78 10.8 18 10.8C17.22 10.8 16.575 11.055 16.065 11.565C15.555 12.075 15.3 12.72 15.3 13.5C15.3 14.28 15.555 14.925 16.065 15.435C16.575 15.945 17.22 16.2 18 16.2Z" fill="#6B7072"/>
						</svg>
						<p>{user.getLogin()}</p>
					</NavLink>
				</div>
			</div>
		</div>
	);
}