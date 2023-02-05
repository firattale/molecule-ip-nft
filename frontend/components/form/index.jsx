import { Field, Form, Formik } from "formik";
import { Button, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
export default function NFTForm() {
	function validateName(value) {
		let error;
		if (!value) {
			error = "Name is required";
		} else if (value.toLowerCase() !== "naruto") {
			error = "Jeez! You're not a fan 😱";
		}
		return error;
	}

	return (
		<Formik
			initialValues={{}}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
				}, 1000);
			}}
		>
			{(props) => (
				<Form>
					<Field name="cure">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.cure && form.touched.cure} isRequired>
								<FormLabel>Cure</FormLabel>
								<Input {...field} />
								<FormErrorMessage>{form.errors.cure}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name="researcher">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.researcher && form.touched.researcher} isRequired>
								<FormLabel>Researcher</FormLabel>
								<Input {...field} />
								<FormErrorMessage>{form.errors.researcher}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name="university">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.university && form.touched.university} isRequired>
								<FormLabel>University</FormLabel>
								<Input {...field} />
								<FormErrorMessage>{form.errors.university}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name="patent_filed.patent_id">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.patent_id && form.touched.patent_id} isRequired>
								<FormLabel>Patent ID</FormLabel>
								<Input {...field} placeholder="e.g. A-12345/CANCER" />
								<FormErrorMessage>{form.errors.patent_id}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Field name="patent_filed.institution">
						{({ field, form }) => (
							<FormControl isInvalid={form.errors.institution && form.touched.institution} isRequired>
								<FormLabel>Institution</FormLabel>
								<Input {...field} />
								<FormErrorMessage>{form.errors.institution}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
					<Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
}
