import NFTForm, { initialValues } from "../components/form";
import { useState, useEffect } from "react";
import { encryptJSON } from "../utils/crypto";
import { client } from "../api/ipfs";
import { useToast, Spinner, Container, Text, Flex } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { mintConfig } from "../contract";

const NFTPage = () => {
	const toast = useToast();
	const [key, setKey] = useState("");
	// Mint NFT function
	const { config } = usePrepareContractWrite(mintConfig);
	const { write: mintNFT, isLoading } = useContractWrite({
		...config,
		onSuccess(data) {
			toast({
				title: "NFT minted.",
				description: "We've successfully minted your IP_NFT.",
				status: "success",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
			console.log("Success", data);
		},
		onError(error) {
			toast({
				title: "Something went wrong.",
				description: "We couldn't minted your NFT, please refresh and try again.",
				status: "error",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
			console.log("Error", error.message);
		},
	});

	const onSubmit = async (values, formActions) => {
		const { cure, ...contractData } = values;

		//encrypt
		const ciphertext = encryptJSON(contractData);
		let ipfsUrl;
		//ipfs
		try {
			const added = await client.add(ciphertext);
			ipfsUrl = `https://infura-ipfs.io/ipfs/${added.path}`;

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

		console.log("ipfsUrl", ipfsUrl);
		mintNFT?.(cure, ipfsUrl);

		formActions.setSubmitting(false);
		formActions.resetForm({
			values: initialValues,
		});
	};
	let encryptionKey;

	useEffect(() => {
		// if (typeof window !== "undefined") {
		setKey(localStorage.getItem("encryption key")?.toString());
		// }
	}, []);

	if (isLoading)
		return (
			<Container centerContent>
				<Spinner size="xl" />
			</Container>
		);
	console.log(key);
	return (
		<>
			<NFTForm onSubmit={onSubmit} />
			{key.length > 0 ? (
				<Flex>
					<Text
						onClick={() => {
							navigator.clipboard.writeText(key);
						}}
						style={{ cursor: "pointer" }}
					>
						Your Encryption Key: {"  "}
						{key}
					</Text>
				</Flex>
			) : (
				""
			)}
		</>
	);
};

export default NFTPage;
