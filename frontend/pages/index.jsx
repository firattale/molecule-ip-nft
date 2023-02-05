import NFTForm, { initialValues } from "../components/form";
import { Container } from "@chakra-ui/react";
import CryptoJS from "crypto-js";

export default function Home() {
	const onSubmit = (values, formActions) => {
		console.log("values", values);
		const { cure, ...contractData } = values;

		// Encrypt
		const ciphertext = CryptoJS.AES.encrypt(
			JSON.stringify(contractData),
			process.env.NEXT_PUBLIC_SECRET_KEY
		).toString();
		console.log("ciphertext", ciphertext);

		// Decrypt
		const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.NEXT_PUBLIC_SECRET_KEY);
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		console.log("decryptedData", decryptedData);

		formActions.setSubmitting(false);
		formActions.resetForm({
			values: initialValues,
		});
	};
	return (
		<Container>
			<NFTForm onSubmit={onSubmit} />
		</Container>
	);
}
