import { Field, Form, Formik } from "formik";
import { Button, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
export default function NFTForm() {
	function validatePatentID(value) {
		let error;
		if (!/^[A-F]-[1-9]{5,7}\/[A-Z]{5,9}$/.test(value)) {
			error = "Invalid patent ID";
		}
		return error;
	}

	return (
		<Formik
			initialValues={{}}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					console.log(values);
					actions.setSubmitting(false);
					actions.resetForm({
						values: {
							cure: "",
							researcher: "",
							university: "",
							patent_filed: {
								patent_id: "",
								institution: "",
							},
						},
					});
				}, 500);
			}}
		>
			{({ errors, isSubmitting, touched, handleSubmit }) => {
				return (
					<Form onSubmit={handleSubmit}>
						<Field name="cure">
							{({ field }) => (
								<FormControl isInvalid={errors.cure && touched.cure} isRequired>
									<FormLabel>Cure</FormLabel>
									<Input {...field} />
									<FormErrorMessage>{errors.cure}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="researcher">
							{({ field }) => (
								<FormControl isInvalid={errors.researcher && touched.researcher} isRequired>
									<FormLabel>Researcher</FormLabel>
									<Input {...field} />
									<FormErrorMessage>{errors.researcher}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="university">
							{({ field }) => (
								<FormControl isInvalid={errors.university && touched.university} isRequired>
									<FormLabel>University</FormLabel>
									<Input {...field} />
									<FormErrorMessage>{errors.university}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="patent_filed.patent_id" validate={validatePatentID}>
							{({ field }) => (
								<FormControl isInvalid={errors.patent_filed?.patent_id && touched.patent_filed?.patent_id} isRequired>
									<FormLabel>Patent ID</FormLabel>
									<Input {...field} placeholder="e.g. A-12345/CANCER" />
									<FormErrorMessage>{errors.patent_filed?.patent_id}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="patent_filed.institution">
							{({ field }) => (
								<FormControl
									isInvalid={errors.patent_filed?.institution && touched.patent_filed?.institution}
									isRequired
								>
									<FormLabel>Institution</FormLabel>
									<Input {...field} />
									<FormErrorMessage>{errors.patent_filed?.institution}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
							Submit
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
}
