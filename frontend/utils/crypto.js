import CryptoJS from "crypto-js";

export const encryptJSON = (contractData) => {
	const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(contractData), process.env.NEXT_PUBLIC_SECRET_KEY).toString();
	return ciphertext;
};

export const decryptJSON = (ciphertext) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.NEXT_PUBLIC_SECRET_KEY);
	const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	return decryptedData;
};
