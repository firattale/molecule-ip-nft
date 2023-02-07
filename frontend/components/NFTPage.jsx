import NFTForm, { initialValues } from "../components/form";
import { useState, useEffect } from "react";
import { encryptJSON } from "../utils/crypto";
import { client } from "../api/ipfs";
import { useToast, Spinner, Text, Flex, Box, Link } from "@chakra-ui/react";
import { useMintNFT } from "../contract/hooks";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const NFTPage = () => {
	const toast = useToast();
	const [key, setKey] = useState("");

	useEffect(() => {
		const key = localStorage.getItem("encryption key");
		if (key) {
			setKey(key.toString());
		}
	}, []);

	const { mintNFTLoading, mintNFT, mintNFTSuccess, mintNFTData, writeConfig } = useMintNFT();
	const onSubmit = async (values, formActions) => {
		const { cure, ...contractData } = values;
		//encrypt
		const ciphertext = encryptJSON(contractData);
		let ipfsUrl;
		//ipfs
		try {
			// const added = await client.add(ciphertext);
			ipfsUrl = `https://infura-ipfs.io/ipfs/${"added.path"}`;
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
		console.log("cure", cure);
		console.log("ipfsUrl", ipfsUrl);
		mintNFT?.({
			recklesslySetUnpreparedArgs: [cure, ipfsUrl],
		});
		formActions.setSubmitting(false);
		formActions.resetForm({
			values: initialValues,
		});
	};

	if (mintNFTLoading) return <Spinner size="xl" />;
	return (
		<>
			{mintNFTSuccess && (
				<Flex mb={4} color="teal.500">
					Successfully minted your NFT!
					<Box ml={2}>
						<Link href={`https://goerli.etherscan.io/tx/${mintNFTData?.hash}`} isExternal>
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
