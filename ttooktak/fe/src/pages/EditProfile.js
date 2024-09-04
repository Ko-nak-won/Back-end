// src/pages/EditProfile.js
import React, { useState } from 'react';

import './EditProfile.css';

export default function EditProfile() {
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
	const months = Array.from({ length: 12 }, (_, i) => i + 1);
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	

	const [selectedYear, setSelectedYear] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedDay, setSelectedDay] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

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

	return (
		<div className='editbg'>
			<div className="editbody">
				<h2 className="edithead">내 정보 수정하기</h2>
				<form>
					<div className="edit_left">
						<input type="text" placeholder='이메일 주소' />
						<input type="text" placeholder='전화번호' value={phoneNumber} onChange={event => handleInputChange(event, setPhoneNumber)} />
							<div className="edit_birth">
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
						<input type="text" placeholder='주소' />
					</div>
					<div className="edit_right">
						<input type="text" placeholder='아이디' />
						<input type="text" placeholder='주소' />
						<input type="password" placeholder='비밀번호' />
						<input type="password" placeholder='비밀번호 확인' />
					</div>
				</form>
				<button>저장하기</button>
			</div>
		</div>
	);
}