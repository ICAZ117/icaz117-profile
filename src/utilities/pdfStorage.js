// src/utils/pdfStorage.js

const STORAGE_KEY_PREFIX = 'cached-pdf:';

function urlToKey(url) {
	return STORAGE_KEY_PREFIX + btoa(url); // Base64-encode to be safe
}

export function savePDFToLocalStorage(url, blob) {
	const reader = new FileReader();
	reader.onload = () => {
		localStorage.setItem(urlToKey(url), reader.result); // Save base64 string
	};
	reader.readAsDataURL(blob); // Converts Blob to base64
}

export function loadPDFFromLocalStorage(url) {
	const dataURL = localStorage.getItem(urlToKey(url));
	return dataURL || null;
}

export function clearCachedPDF(url) {
	localStorage.removeItem(urlToKey(url));
}
