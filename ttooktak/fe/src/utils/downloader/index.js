/**
* @argument {string} filename 다운로드 될 파일의 파일명
* @argument {Blob} data 다운로드 될 파일의 데이터
*/
export function downloadByBinary(filename, data) {
	const fileObjectUrl = URL.createObjectURL(data);

	const link = document.createElement('a');
	link.href = fileObjectUrl;
	link.style.display = 'none';

	link.download = filename;

	document.body.appendChild(link);
	link.click();
	link.remove();

	URL.revokeObjectURL(fileObjectUrl);
}