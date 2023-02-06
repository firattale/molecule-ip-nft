import CryptoJS from "crypto-js";

export const encryptJSON = (contractData) => {
	const hash = CryptoJS.SHA256(Math.random().toString()).toString(CryptoJS.enc.Base64);
	localStorage.setItem("encryption key", hash);
	const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(contractData), hash).toString();
	return ciphertext;
};

export const decryptJSON = (ciphertext) => {
	const hash = localStorage.getItem("encryption key");
	const bytes = CryptoJS.AES.decrypt(ciphertext, hash);
	const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	return decryptedData;
};
