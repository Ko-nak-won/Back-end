import React from "react";
import { Link } from 'react-router-dom';

import './MainPage.css';

export default function indexFile() {
	return (
		<div className="indexBody">
			<div className="guide001">
				<div className="guideImgBox">
					<img src="/exampleIMAGES.png" alt="예시이미지" />
				</div>
				<div className="guide001Contents">
					<h3>뚝딱이는 가장 편리한 번역 도구입니다.</h3>
					<button>소개보기</button>
				</div>
			</div>
			<div className="guide002">
				<div className="guideImgBox">
					<img src="/exampleIMAGES.png" alt="예시이미지" />
				</div>
				<div className="guide002Contents">
					<h3>뚝딱이는 회원가입 없이도<br />사용가능!</h3>
					<Link to="/translate">
						<button>체험하기</button>
					</Link>
				</div>
			</div>
			<div className="guide003">
				<div className="guideImgBox">
					<img src="/exampleIMAGES.png" alt="예시이미지" />
				</div>
				<div className="guide003Contents">
					<h3>지금 뚝딱이를<br /> 사용해보세요!</h3>
					<Link to="/login">
						<button>로그인 / 회원가입</button>
					</Link>
				</div>
			</div>
		</div>
	);
}