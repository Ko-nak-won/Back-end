import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosError } from 'axios';

import { downloadByBinary } from '../utils/downloader';
import { parseCSV, parseSRT, parseTXT } from '../utils/subtitleParser';

import PlayBtnIcon from '../components/PlayBtnIcon';
import UploadLayout from '../components/UploadLayout';

import './Translate.css';



let formData = new FormData();

export default function Translate() {
	const [fileInfo, setFileInfo] = useState({ name: '', url: '' });
	const [activeStep, setActiveStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [popup, setPopup] = useState(false);
	const [result, setResult] = useState([]);

	/** @argument {MouseEvent} e */
	const onLanguageChoose = (e) => {
		formData.set('language', e.target.id);
	};
	/** @argument {MouseEvent} e */
	const onFormatChoose = (e) => {
		formData.set('format', e.target.id);

		setLoading(true);

		axios.post('http://127.0.0.1:8000/api/upload/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			responseType: 'blob',
		})
			.then(response => {
				/** @type {Blob} */
				const data = response.data;

				// 만약 응답 데이터 타입이 파일일 경우
				if (data.type === 'application/octet-stream') {
					const filename = formData.get('filename').replace(/\.[^/.]+$/, '');
					const fileExt = formData.get('format');
					const reader = new FileReader();
		
					reader.onload = () => {
						window.result = reader.result;
						
						switch (fileExt) {
							case 'txt':
								setResult(parseTXT(reader.result));
								break;
							case 'srt':
								setResult(parseSRT(reader.result));
								break;
							case 'csv':
								setResult(parseCSV(reader.result));
								break;
						}

						setLoading(false);
		
						setActiveStep(4);
					};
		
					reader.readAsText(response.data);
		
					downloadByBinary(`${filename}.${fileExt}`, response.data);
				}
				
				// 만약 응답 데이터 타입이 json일 경우
				if (data.type === 'application/json') {
					// 서버가 expected error를 반환한 것이므로 출력
					data.text().then(d => {
						throw new AxiosError(d);
					});
				}
			});
	};
	const onDrop = useCallback(/** @argument {File[]} acceptedFiles */ async acceptedFiles => {
		const file = acceptedFiles[0];
		if (file && file.type === 'video/mp4') {
			formData.set('filename', file.name);
			formData.set('filedata', file);

			setFileInfo({
				name: file.name,
				url: URL.createObjectURL(file),
			});

			setActiveStep(3); // 파일 업로드 후 단계 3으로 이동
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: 'video/*'
	});

	return (
		<div className='translateBody'>
			<div className="translateBg">
				<div {...getRootProps()} style={{ opacity: fileInfo.url ? 0 : 1 }} className="uploadBox">
					<input {...getInputProps()} />
					{isDragActive ? (
							// isDragActive || showAfter ?
							<div className="after">
								<div className="uploadWindow">
									<div className="uploadGuide">
										<svg width="128" height="128" viewBox="0 0 128 128" fill="none">
											<path d="M31.1414 54.056C19.4 56.848 10.6667 67.4054 10.6667 80C10.6667 94.728 22.6054 106.667 37.3334 106.667C39.8587 106.667 42.304 106.315 44.6214 105.659M96.1467 54.056C107.888 56.848 116.619 67.4054 116.619 80C116.619 94.728 104.68 106.667 89.952 106.667C87.4267 106.667 84.9813 106.315 82.6667 105.659M96 53.3334C96 35.6614 81.672 21.3334 64 21.3334C46.328 21.3334 32 35.6614 32 53.3334M45.5067 74.3494L64 55.7974L83.0187 74.6667M64 101.333V65.232" stroke="#EB9E9D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
										<p>원하는 영상을<br/>업로드 해주세요.</p>
									</div>
								</div>
							</div>
						) : (
							<div className="before">
								<div className="playBox">
									<PlayBtnIcon/>
									<p>영상을 업로드하세요</p>
								</div>
								<UploadLayout/>
							</div>
						)
					}
				</div>
				{fileInfo.url && (
					<div className="videoBox">
						<video src={fileInfo.url} controls style={{ width: '100%', height: 'auto' }}>
							Your browser does not support the video tag.
						</video>
					</div>
				)}
				<div className={`no1 ${activeStep === 1 ? 'on' : ''}`}>
					<div className="no1Box">
						<p>1. 원하는 동영상, 음성 파일을 드래그하여 넣으세요!</p>
						<button className="fileSelect" onClick={() => document.querySelector('.uploadBox input').click()}>파일선택</button>
					</div>
				</div>
				<div className={`no2 ${activeStep === 1 ? 'on' : ''}`}>
					<div className="no2Box">
						<p>뚝딱이가 영상의 자막을<br />생성합니다!</p>
					</div>
				</div>
				<div className={`no4 ${activeStep === 3 ? 'on' : ''}`}>
					<div className="no4Box">
						<p>2. 원하는 언어를<br />선택해 주세요</p>
						<button className='ko' id='KO' onClick={onLanguageChoose}>한국어</button>
						<button className='en' id='EN' onClick={onLanguageChoose}>영어</button>
						<button className='cn' id='ZH' onClick={onLanguageChoose}>중국어</button>
						<button className='jp' id='JA' onClick={onLanguageChoose}>일본어</button>
						<button className='ru' id='RU' onClick={onLanguageChoose}>러시아어</button>
						<button className='sp' id='ES' onClick={onLanguageChoose}>스페인어</button>
					</div>
				</div>
				<div className={`no5 ${activeStep === 3 ? 'on' : ''}`}>
					<div className="no5Box">
						<p>3. 다운로드 받을 포멧을 선택해 주세요</p>
						<button className="formetSelet" id='txt' onClick={onFormatChoose}>.txt</button>
						<button className="formetSelet" id='srt' onClick={onFormatChoose}>.srt</button>
						<button className="formetSelet" id='csv' onClick={onFormatChoose}>.csv</button>
					</div>
				</div>
				<div className={`no6 ${activeStep === 4 ? 'on' : ''}`}>
					<div className="no6Box">
						<ul>
							{result.map((r, k) => (
								<li key={k}>
									{(r.timeline.start.length > 0 && r.timeline.end.length > 0) && (
										<p className='timeline'>{`${r.timeline.start} --> ${r.timeline.end}`}</p>
									)}
									<p className="subtitle">{r.subtitle}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className={`no3 ${activeStep === 4 ? 'on' : ''}`}>
					<div className="no3Box">
						<p>전체 화면으로 결과 확인을 원하시면 선택해 주세요.</p>
						<button className="pageOpen" onClick={() => setPopup(true)}>결과확인</button>
					</div>
				</div>
				<div className={`resultPageFull ${popup ? "resultPageActive" : ''}`}>
					<ul>
						{result.map((r, k) => (
							<li key={k}>
								{(r.timeline.start.length > 0 && r.timeline.end.length > 0) && (
									<p className='timeline'>{`${r.timeline.start} --> ${r.timeline.end}`}</p>
								)}
								<p className="subtitle">{r.subtitle}</p>
							</li>
						))}
					</ul>
					<button className='closeBtn' onClick={() => setPopup(false)}>닫기</button>
				</div>
				<div className={loading ? "loading" : ""}/>
			</div>
		</div>
	);
}