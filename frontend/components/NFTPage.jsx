import NFTForm, { initialValues } from "../components/form";
import { useState } from "react";
import { encryptJSON } from "../utils/crypto";
import { client } from "../api/ipfs";
import { useToast, Spinner, Container } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { mintConfig } from "../contract";

const NFTPage = () => {
	const [fileUrl, updateFileUrl] = useState("");
	const toast = useToast();

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

		//ipfs
		try {
			const added = await client.add(ciphertext);
			const url = `https://infura-ipfs.io/ipfs/${added.path}`;
			updateFileUrl(url);
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

		console.log("fileUrl", fileUrl);
		mintNFT?.(cure, fileUrl);

		formActions.setSubmitting(false);
		formActions.resetForm({
			values: initialValues,
		});
	};
	if (isLoading)
		return (
			<Container centerContent>
				<Spinner size="xl" />
			</Container>
		);
	return <NFTForm onSubmit={onSubmit} />;
};

export default NFTPage;
