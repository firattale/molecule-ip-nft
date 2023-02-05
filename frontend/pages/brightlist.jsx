import { Container, Input, InputGroup, InputRightElement, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { addToBrightlistConfig } from "../contract/index";
export default function Brightlist() {
	const [brightlistValue, setBrightlistValue] = useState("");
	const [revokeValue, setRevokeValue] = useState("");

	const { config } = usePrepareContractWrite({ ...addToBrightlistConfig, args: [brightlistValue] });
	const { data, isLoading, isSuccess, write: addToBrightlist } = useContractWrite(config);

	const handleBrightlistChange = (event) => setBrightlistValue(event.target.value);
	const handleRevokeChange = (event) => setRevokeValue(event.target.value);

	const handleBrightlistClick = () => {
		console.log(brightlistValue);
		addToBrightlist?.();
	};
	const handleRevokeClick = () => {
		console.log(revokeValue);
	};
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
