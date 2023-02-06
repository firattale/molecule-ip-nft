import { useContractRead, useAccount } from "wagmi";
import { ownerConfig } from "../contract/config";

export const useOwner = () => {
	const { data: owner } = useContractRead(ownerConfig);
	const { address } = useAccount();

	return owner === address;
};
