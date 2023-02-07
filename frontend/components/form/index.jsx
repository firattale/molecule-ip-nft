import { Field, Form, Formik } from "formik";
import { useAccount } from "wagmi";
import { Button, FormControl, FormLabel, Input, FormErrorMessage, Box } from "@chakra-ui/react";
export const initialValues = {
	cure: "",
	researcher: "",
	university: "",
	patent_filed: {
		patent_id: "",
		institution: "",
	},
};
export default function NFTForm({ onSubmit }) {
	const { isConnected } = useAccount();
	const validatePatentID = (value) => {
		let error;
		if (!/^[A-F]-[1-9]{5,7}\/[A-Z]{5,9}$/.test(value)) {
			error = "Invalid patent ID";
		}
		return error;
	};

	return (
		<Box w="100%" mb={6}>
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{({ errors, isSubmitting, touched, handleSubmit }) => {
					return (
						<Form onSubmit={handleSubmit}>
							<Field name="cure">
								{({ field }) => (
									<FormControl isInvalid={errors.cure && touched.cure} isRequired mb={2}>
										<FormLabel data-selector="cureLabel">Cure</FormLabel>
										<Input {...field} data-selector="cureInput" />
										<FormErrorMessage>{errors.cure}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="researcher">
								{({ field }) => (
									<FormControl isInvalid={errors.researcher && touched.researcher} isRequired mb={2}>
										<FormLabel data-selector="researcherLabel">Researcher</FormLabel>
										<Input {...field} data-selector="researcherInput" />
										<FormErrorMessage>{errors.researcher}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="university">
								{({ field }) => (
									<FormControl isInvalid={errors.university && touched.university} isRequired mb={2}>
										<FormLabel data-selector="universityLabel">University</FormLabel>
										<Input {...field} data-selector="universityInput" />
										<FormErrorMessage>{errors.university}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="patent_filed.patent_id" validate={validatePatentID}>
								{({ field }) => (
									<FormControl
										isInvalid={errors.patent_filed?.patent_id && touched.patent_filed?.patent_id}
										isRequired
										mb={2}
									>
										<FormLabel data-selector="patentIdLabel">Patent ID</FormLabel>
										<Input {...field} placeholder="e.g. A-12325/CANCER" data-selector="patentIdInput" />
										<FormErrorMessage data-selector="patentIdError">{errors.patent_filed?.patent_id}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="patent_filed.institution">
								{({ field }) => (
									<FormControl
										isInvalid={errors.patent_filed?.institution && touched.patent_filed?.institution}
										isRequired
										mb={2}
									>
										<FormLabel data-selector="institutionLabel">Institution</FormLabel>
										<Input {...field} data-selector="institutionInput" />
										<FormErrorMessage>{errors.patent_filed?.institution}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Button
								mt={2}
								colorScheme="teal"
								isLoading={isSubmitting}
								type="submit"
								data-selector="mintButton"
								disabled={!isConnected}
							>
								Mint IP-NFT
							</Button>
						</Form>
					);
				}}
			</Formik>
		</Box>
	);
}
