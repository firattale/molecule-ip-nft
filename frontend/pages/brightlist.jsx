import { Container, Input, InputGroup, InputRightElement, Button, Text, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { addToBrightlistConfig, removeFrombrightlistConfig } from "../contract/index";

export default function Brightlist() {
	const [brightlistValue, setBrightlistValue] = useState("");
	const [revokeValue, setRevokeValue] = useState("");
	const toast = useToast();

	const { config } = usePrepareContractWrite({ ...addToBrightlistConfig, args: [brightlistValue] });
	const { config: secondConfig } = usePrepareContractWrite({ ...removeFrombrightlistConfig, args: [revokeValue] });
	const { isLoading, write: addToBrightlist } = useContractWrite({
		...config,
		onSuccess(data) {
			console.log("Success", data);
			toast({
				description: "The user successfully brightlisted.",
				status: "success",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "Something went wrong.",
				description: "The user can't be brightlisted.",
				status: "error",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
			console.log("Error", error.message);
		},
	});
	const { isLoading: removeFrombrightlistLoading, write: removeFrombrightlist } = useContractWrite({
		...secondConfig,
		onSuccess(data) {
			console.log("Success", data);
			toast({
				description: "The user successfully removed from brightlist.",
				status: "success",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "Something went wrong.",
				description: "The user can't be removed from brightlist.",
				status: "error",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
			console.log("Error", error.message);
		},
	});

	const handleBrightlistChange = (event) => setBrightlistValue(event.target.value);
	const handleRevokeChange = (event) => setRevokeValue(event.target.value);

	const handleBrightlistClick = () => {
		addToBrightlist?.();
	};
	const handleRevokeClick = () => {
		removeFrombrightlist?.();
	};

	if (isLoading || removeFrombrightlistLoading)
		return (
			<Container centerContent>
				<Spinner size="xl" />
			</Container>
		);

	return (
		<Container centerContent>
			<Text mb={4}>Brightlist Page</Text>
			<InputGroup size="md" mb={4}>
				<Input pr="4.5rem" type="text" placeholder="0x..." onChange={handleBrightlistChange} />
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleBrightlistClick}>
						Brightlist
					</Button>
				</InputRightElement>
			</InputGroup>
			<InputGroup size="md">
				<Input pr="4.5rem" type="text" placeholder="0x..." onChange={handleRevokeChange} />
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleRevokeClick}>
						Revoke
					</Button>
				</InputRightElement>
			</InputGroup>
		</Container>
	);
}
