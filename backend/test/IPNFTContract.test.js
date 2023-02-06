const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("IP-NFT Contract", function () {
	async function deployFixtures() {
		const [owner, account2, account3] = await ethers.getSigners();

		const IPNFTContract = await ethers.getContractFactory("IP_NFTContract");
		const nftContract = await IPNFTContract.deploy();

		return { nftContract, owner, account2, account3 };
	}

	describe("BrightListing", function () {
		it("Should set the address2 brightlisted", async function () {
			const { nftContract, account2 } = await loadFixture(deployFixtures);

			await expect(nftContract.addToBrightlist(account2.address))
				.to.emit(nftContract, "NewMinter")
				.withArgs(account2.address);

			expect(await nftContract.brightlist(account2.address)).to.equal(true);
		});

		it("Should revoke address2", async function () {
			const { nftContract, account2 } = await loadFixture(deployFixtures);

			await nftContract.addToBrightlist(account2.address);

			await expect(nftContract.removeFrombrightlist(account2.address))
				.to.emit(nftContract, "RevokedMinter")
				.withArgs(account2.address);

			expect(await nftContract.brightlist(account2.address)).to.equal(false);
		});

		it("Should only allow owner to brightlist", async function () {
			const { nftContract, account2, account3 } = await loadFixture(deployFixtures);

			await expect(nftContract.connect(account2).addToBrightlist(account3.address)).to.be.revertedWith(
				"Ownable: caller is not the owner"
			);
		});
	});

	describe("Minting", function () {
		it("should not allow account2 to mint", async function () {
			const { nftContract, account2 } = await loadFixture(deployFixtures);

			await expect(nftContract.connect(account2).safeMint("cancer", "ipfs://contractData")).to.be.revertedWith(
				"NOT_IN_BRIGHTLIST"
			);
		});

		it("should safemint for a brightlisted user", async function () {
			const { nftContract, account2 } = await loadFixture(deployFixtures);

			await nftContract.addToBrightlist(account2.address);
			await expect(nftContract.connect(account2).safeMint("cancer", "ipfs://contractData"))
				.to.emit(nftContract, "NewToken")
				.withArgs(account2.address, 0);

			const nftData = await nftContract.nftData(0);
			expect(nftData).to.have.property("description", "cancer");
			expect(nftData).to.have.property("contractData", "ipfs://contractData");

			expect(await nftContract.brightlist(account2.address)).to.equal(false);
		});

		it("should not allow user to mint after minting", async function () {
			const { nftContract, account2 } = await loadFixture(deployFixtures);

			await nftContract.addToBrightlist(account2.address);
			await nftContract.connect(account2).safeMint("cancer", "ipfs://contractData");

			await expect(nftContract.connect(account2).safeMint("cancer", "ipfs://contractData")).to.be.revertedWith(
				"NOT_IN_BRIGHTLIST"
			);
		});
	});

	describe("Token URI", function () {
		it("should revert for unminted token id", async function () {
			const { nftContract } = await loadFixture(deployFixtures);
			await expect(nftContract.tokenURI(3)).to.be.revertedWith("ERC721: invalid token ID");
		});

		it("should show the correct JSON", async function () {
			const { nftContract, account2 } = await loadFixture(deployFixtures);
			await nftContract.addToBrightlist(account2.address);
			await nftContract.safeMint("cancer", "ipfs://contractData");

			const dataURI = await nftContract.tokenURI(0);
			// parse dataURI to json
			const json = atob(dataURI.substring(29));
			const result = JSON.parse(json);

			expect(result).to.have.property("name", "token #0");
			expect(result).to.have.property("description", "this token can cure cancer");
			expect(result).to.have.property("contractData", "ipfs://contractData");
		});
	});
});
