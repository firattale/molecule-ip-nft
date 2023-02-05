import NFTForm, { initialValues } from "../components/form";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { encryptJSON } from "../utils/crypto";
import { client } from "../api/ipfs";
import { useToast } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite, useContractRead, useAccount } from "wagmi";
import { brightlistConfig, mintConfig } from "../contract";

const NFTPage = () => {
	const { address } = useAccount();
	const [fileUrl, updateFileUrl] = useState("");
	const toast = useToast();

	const { data: isBrightListed } = useContractRead({ ...brightlistConfig, args: [address] });
	console.log("isBrightListed", isBrightListed);

	const { config } = usePrepareContractWrite(mintConfig);
	const { data, write } = useContractWrite({
		...config,
		onSuccess(data) {
			toast({
				title: "NFT minted.",
				description: "We've successfully minted your IP_NFT.",
				status: "success",
				duration: 3000,
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
				duration: 3000,
				position: "top",
				isClosable: true,
			});
			console.log("Error", error);
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
			console.log("IPFS URI: ", url);
			toast({
				title: "IPFS Upload finished.",
				description: "We've uploaded your encrypted data to IPFS.",
				status: "success",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		} catch (error) {
			console.log("Error uploading file: ", error);
			toast({
				title: "Something went wrong.",
				description: "We've couldn't upload your encrypted data to IPFS, please refresh and try again.",
				status: "error",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		}

		console.log("fileUrl", fileUrl);
		write?.(cure, fileUrl);

		formActions.setSubmitting(false);
		formActions.resetForm({
			values: initialValues,
		});
		console.log("data", data);
	};
	// if (!isBrightListed) {
	// 	return <Text fontSize="xl">You are not brightlisted, please contact to admin</Text>;
	// }
	return <NFTForm onSubmit={onSubmit} />;
};

export default NFTPage;
