import React, { useState, useEffect, useRef } from 'react';

import "./TtooktakInfo.css";

export default function TooktakInformation() {
	const [showDetails, setShowDetails] = useState({
		why001: false,
		why002: false,
		why003: false,
		intro001: false,
		intro002: false,
		intro003: false,
		intro004: false
	});
	const [animated, setAnimated] = useState({
		whyHead: false,
		introHead: false
	});

	const headerRefs = {
		whyHead: useRef(null),
		introHead: useRef(null)
	};

	// 애니메이션을 적용할 요소들의 참조
	const refs = {
		why001: useRef(null),
		why002: useRef(null),
		why003: useRef(null),
		intro001: useRef(null),
		intro002: useRef(null),
		intro003: useRef(null),
		intro004: useRef(null)
	};

	const animateText = (ref, headerKey) => {
		if (!animated[headerKey]) { // 애니메이션 적용 여부를 체크
			const element = ref.current;
			const text = element.innerHTML;
			element.innerHTML = '';
			for (let i = 0; i < text.length; i++) {
				setTimeout(() => {
					element.innerHTML += text[i];
				}, i * 75);
			}
			setAnimated(prev => ({ ...prev, [headerKey]: true })); // 애니메이션이 적용된 후 상태 업데이트
		}
	};

	useEffect(() => {
		// 최초 로드 시 두 헤더에 텍스트 애니메이션 적용
		animateText(headerRefs.whyHead, 'whyHead');
		animateText(headerRefs.introHead, 'introHead');

		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setShowDetails(prevState => ({
				...prevState,
				why001: scrollPosition >= 100 || prevState.why001,
				why002: scrollPosition >= 500 || prevState.why002,
				why003: scrollPosition >= 1000 || prevState.why003,
				intro001: scrollPosition >= 1800 || prevState.intro001,
				intro002: scrollPosition >= 2300 || prevState.intro002,
				intro003: scrollPosition >= 2500 || prevState.intro003,
				intro004: scrollPosition >= 2800 || prevState.intro004
			}));
			console.log(scrollPosition);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	return (
		<main>
			<div className="whyTooktak">
				<div className="whyTooktakHead">
					<h3 ref={headerRefs.whyHead}>
						뚝딱이는 왜 필요할까요?
					</h3>
				</div>
				<div className="whyTooktak001">
					<div className={`whyTootakbody ${showDetails.why001 ? 'slide-in-R' : ''}`} ref={refs.why001}>
						<h4>크리에이터 여러분, 여러분의 컨텐츠는 안녕하십니까?</h4>
						<div className="whyDetail001">
							<div className="imgBox">
								<img src="./img001.png" alt="유튜브이미지" />
								<img src="./img002.png" alt="번역완료이미지" />
							</div>
							<p>
								전세계 이용자들이 내 영상을 볼 수 있는 시대가 도래했습니다.<br />
								자막은 영상의 질과 더불어 구독자의 만족도를 높일 수 있는 올릴 수 있는 가장 쉬운 방법입니다.<br />
								자막을 통해 콘텐츠의 접근성과 품질을 크게 향상시킬 수 있습니다.<br />
								뚝딱이는 번역을 쉽고 빠르게 도와줄 수 있습니다.<br />
							</p>
						</div>
					</div>
				</div>
				<div className="whyTooktak002">
					<div className={`whyTootakbody ${showDetails.why002 ? 'slide-in-L' : ''}`} ref={refs.why002}>
						<h4>자막, 그거 꼭 필요한가?</h4>
						<div className="whyDetail002">
							<div className="imgBox">
								<img src="./img003.png" alt="자막생성이미지" />
							</div>
							<p>
								네! 자막 필요합니다!<br />
								자막이 검색 엔진 최적화(SEO)에 효과적이라는 사실, 알고 계셨나요? 자막이 포함된 동영상은 검색 엔진에 더 잘 인식되어 검색 결과상위에 노출될 확률이 높아집니다.<br />
								검색 엔진은 자막 내에서 텍스트를 색인화하여 콘텐츠를 더 쉽게 검색하고 유기적 트래픽을 유도할 수 있습니다.<br />
								자막이 영상 내용에 대한 추가적인 키위드를 제공하는 셈이죠.
							</p>
						</div>
					</div>
				</div>
				<div className="whyTooktak003">
					<div className={`whyTootakbody ${showDetails.why003 ? 'slide-in-R' : ''}`} ref={refs.why003}>
						<h4>요즘은 유튜브로 언어 공부합니다.</h4>
						<div className="whyDetail003">
							<p>
								정확한 내용의 자막은 더 많은 도움을 줄 수 있습니다. 유튜브에서 제공되는 드라마나 예능 프로그램은 일상적인 대화와 문화적 맥락을 반영한 표현을 학습하는 데 큰 도움이 됩니다.<br />
								이러한 콘텐츠를 통해 자연스러운 회화와 실용적인 어휘를 접할 수 있으며, 문법 설명만으로는 얻기 어려운 언어의 사용 사례 또한 경험할 수 있습니다.<br />
								정확한 자막이 있으면 새로운 단어나 문장을 여러 번 볼 수 있어서, 기억하기도 훨씬 쉽죠.
							</p>
							<div className="imgBox">
								<img src="./img004.png" alt="스터디이미지" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="introduceTooktak">
				<div className="introduceTooktakHead">
					<h3 ref={headerRefs.introHead}>
						뚝딱이를 소개합니다!
					</h3>
				</div>
				<div className="introduceTooktak001">
					<div className={`introduceTooktakbody ${showDetails.intro001 ? 'slide-in-L' : ''}`} ref={refs.intro001}>
						<h4>뚝딱이는 가장 편리한 번역 프로그램입니다.</h4>
						<div className="introDetail001">
							<p>
								오늘날 글로벌 시대에서 언어 장벽은 더 이상 큰 장애물이 아닙니다. 우리는 전 세계 사람들과 소통하고, 다양한 문화를 이해하며, 정보에 접근할 수 있게 되었습니다. 이러한 변화의 중심에는 번역 기술이 자리하고 있습니다.
							</p>
						</div>
					</div>
				</div>
				<div className="introduceTooktak002">
					<div className={`introduceTooktakbody ${showDetails.intro002 ? 'slide-in-R' : ''}`} ref={refs.intro002}>
						<h4>뚝딱이는 자막을 ‘뚝딱’ 만듭니다.</h4>
						<div className="introDetail002">
							<p>
								이름에서 알 수 있듯이, 뚝딱이는 빠르고 효율적으로 번역 작업을 수행합니다. 급히 번역이 필요한 상황에서 특히 유용합니다. 번역 결과를 기다리며 시간을 낭비할 필요가 없습니다.
							</p>
						</div>
					</div>
				</div>
				<div className="introduceTooktak003">
					<div className={`introduceTooktakbody ${showDetails.intro003 ? 'slide-in-L' : ''}`} ref={refs.intro003}>
						<h4>뚝딱이는 정확합니다.</h4>
						<div className="introDetail003">
							<p>
								뚝딱이는 최신 번역 알고리즘과 AI 기술을 기반으로 하여, 문맥을 고려한 정확한 번역을 제공합니다. 네이버의 Clova Speech API를 활용해 음성을 정확하게 인식하고, DeepL API를 이용해 자연스러운 번역을 제공합니다. 단순한 단어 변환이 아닌, 문장의 의미와 뉘앙스를 최대한 반영한 결과물을 제공합니다.
							</p>
						</div>
					</div>
				</div>
				<div className="introduceTooktak004">
					<div className={`introduceTooktakbody ${showDetails.intro004 ? 'slide-in-R' : ''}`} ref={refs.intro004}>
						<h4>뚝딱이는 ‘똑똑’합니다.</h4>
						<div className="introDetail004">
							<p>
								뚝딱이는 한국어, 중국어, 일본어, 영어, 스페인어, 러시아어, 총 6가지 언어를 번역할 수 있습니다. 이를 통해 다양한 국가와 문화권의 사람들과 자유롭게 의사소통할 수 있습니다.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}