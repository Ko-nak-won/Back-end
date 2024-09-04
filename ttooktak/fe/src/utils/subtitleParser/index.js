/**
 * SRT 데이터를 객체 배열로 파싱합니다.
 * 
 * @param {string} srt 파싱할 SRT 데이터
 */
export function parseSRT(srt) {
	const srtLines = srt.trim().split('\n');
	const subtitles = [];
	let index = 0;

	while (index < srtLines.length) {
		const lineNumber = srtLines[index].trim();
		if (!lineNumber || isNaN(lineNumber)) {
			index++;
			continue;
		}
		index++;

		const timeline = srtLines[index].trim();
		index++;

		const [start, end] = timeline.split(' --> ');

		let subtitleText = '';
		while (index < srtLines.length && srtLines[index].trim() !== '') {
			subtitleText += ` ${srtLines[index].trim()}`;
			index++;
		}
		index++;

		subtitles.push({
			timeline: { start, end, },
			subtitle: subtitleText.trim(),
		});
	}

	return subtitles;
}

/**
 * CSV 데이터를 객체 배열로 파싱합니다.
 * 
 * @param {string} csv 파싱할 CSV 데이터
 */
export function parseCSV(csvData) {
	const lines = csvData.trim().split('\r\n');
	
	const result = [];
	
	for (let i = 1; i < lines.length; i++) {
		const parts = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
		
		const start = parts[1].replace(/"/g, '').trim();
		const end = parts[2].replace(/"/g, '').trim();
		const subtitle = parts[3].replace(/"/g, '').trim();

		result.push({
			timeline: { start, end, },
			subtitle: subtitle,
		});
	}
	
	return result;
}

/**
 * TXT 데이터를 객체 배열로 파싱합니다.
 * 
 * @param {string} txt
 */
export function parseTXT(txt) {
	const lines = txt.trim().split('\n');
	
	const result = [];
	
	lines.forEach((line) => {
		result.push({
			timeline: {
				start: '',
				end: '',
			},
			subtitle: line.trim()
		});
	});
	
	return result;
}