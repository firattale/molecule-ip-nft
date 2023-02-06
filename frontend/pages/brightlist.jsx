import {
	Container,
	Input,
	InputGroup,
	InputRightElement,
	Flex,
	Button,
	Text,
	Spinner,
	Box,
	Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { useAddBrightlist, useRemoveFromBrightlist } from "../contract/hooks";
import { useDebounce } from "usehooks-ts";

export default function Brightlist() {
	const [brightlistValue, setBrightlistValue] = useState("");
	const debouncedBrightlistValue = useDebounce(brightlistValue, 500);

	const [revokeValue, setRevokeValue] = useState("");
	const debouncedRevokeValue = useDebounce(revokeValue, 500);

	const { addToBrightlist, addToBrightlistLoading, addToBrightlistSuccess, addToBrightlistData } =
		useAddBrightlist(debouncedBrightlistValue);
	const { removeFromBrightlistLoading, removeFromBrightlist, removeFromBrightListSuccess, removeFromBrightListData } =
		useRemoveFromBrightlist(debouncedRevokeValue);

	const handleBrightlistChange = (event) => setBrightlistValue(event.target.value);
	const handleRevokeChange = (event) => setRevokeValue(event.target.value);

	const handleBrightlistClick = () => {
		addToBrightlist?.();
	};
	const handleRevokeClick = () => {
		removeFromBrightlist?.();
	};

	if (addToBrightlistLoading || removeFromBrightlistLoading)
		return (
			<Container centerContent>
				<Spinner size="xl" />
			</Container>
		);

	return (
		<Container centerContent>
			<Text mb={4}>Brightlist Page</Text>
			{addToBrightlistSuccess && (
				<Flex mb={4} color="teal.500">
					User successfully brightlisted!
					<Box ml={2}>
						<Link href={`https://goerli.etherscan.io/tx/${addToBrightlistData?.hash}`} isExternal>
							Goerli Etherscan link <ExternalLinkIcon mx="2px" />
						</Link>
					</Box>
				</Flex>
			)}
			{removeFromBrightListSuccess && (
				<Flex mb={4} color="teal.500">
					User successfully revoked!
					<Box ml={2}>
						<Link href={`https://goerli.etherscan.io/tx/${removeFromBrightListData?.hash}`} isExternal>
							Goerli Etherscan link <ExternalLinkIcon mx="2px" />
						</Link>
					</Box>
				</Flex>
			)}
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
