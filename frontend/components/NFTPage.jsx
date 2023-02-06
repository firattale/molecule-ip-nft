import NFTForm, { initialValues } from "../components/form";
import { useState, useEffect } from "react";
import { encryptJSON } from "../utils/crypto";
import { client } from "../api/ipfs";
import { useToast, Spinner, Container, Text, Flex, Box, Link } from "@chakra-ui/react";
import { useMintNFT } from "../contract/hooks";

const NFTPage = () => {
	const toast = useToast();
	const [key, setKey] = useState("");
	const [description, setDescription] = useState("");
	const [url, setIpfsUrl] = useState("");
	useEffect(() => {
		setKey(localStorage.getItem("encryption key")?.toString());
	}, []);

	const { mintNFTLoading, mintNFT, mintNFtSuccess, mintNFtData } = useMintNFT(description, url);

	const onSubmit = async (values, formActions) => {
		const { cure, ...contractData } = values;
		setDescription(cure);
		//encrypt
		const ciphertext = encryptJSON(contractData);
		let ipfsUrl;
		//ipfs
		try {
			const added = await client.add(ciphertext);
			ipfsUrl = `https://infura-ipfs.io/ipfs/${added.path}`;
			setIpfsUrl(ipfsUrl);
			toast({
				title: "IPFS Upload finished.",
				description: "We've uploaded your encrypted data to IPFS.",
				status: "success",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
		} catch (error) {
			console.log("Error uploading file: ", error);
			toast({
				title: "Something went wrong.",
				description: "We've couldn't upload your encrypted data to IPFS, please refresh and try again.",
				status: "error",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
		}
		console.log("description", description);
		console.log("url", url);
		mintNFT?.();

		formActions.setSubmitting(false);
		formActions.resetForm({
			values: initialValues,
		});
	};

	if (mintNFTLoading)
		return (
			<Container centerContent>
				<Spinner size="xl" />
			</Container>
		);
	return (
		<>
			{mintNFtSuccess && (
				<Flex mb={4} color="teal.500">
					Successfully minted your NFT!
					<Box ml={2}>
						<Link href={`https://goerli.etherscan.io/tx/${mintNFtData?.hash}`} isExternal>
							Goerli Etherscan link <ExternalLinkIcon mx="2px" />
						</Link>
					</Box>
				</Flex>
			)}
			<NFTForm onSubmit={onSubmit} />
			{key?.length > 0 ? (
				<Flex>
					<Text
						cursor="pointer"
						whiteSpace="pre"
						onClick={() => {
							navigator.clipboard.writeText(key);
							toast({
								title: `Copied`,
								status: "info",
								isClosable: true,
								position: "top",
							});
						}}
					>
						Your Encryption Key: {key}
					</Text>
				</Flex>
			) : (
				""
			)}
		</>
	);
};

export default NFTPage;
