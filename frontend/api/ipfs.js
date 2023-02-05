import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

/* configure Infura auth settings */
const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET;
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

/* create the client */
export const client = create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});
