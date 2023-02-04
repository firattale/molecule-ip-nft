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

			expect(await nftContract.addToBrightlist(account2.address))
				.to.emit(nftContract, "NewMinter")
				.withArgs(account2.address);

			expect(await nftContract.brightlist(account2.address)).to.equal(true);
		});

		it("Should revoke address2", async function () {
			const { nftContract, account2 } = await loadFixture(deployFixtures);

			await nftContract.addToBrightlist(account2.address);

			expect(await nftContract.removeFrombrightlist(account2.address))
				.to.emit(nftContract, "NewMinter")
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

	describe;
	// 	it("Should set the right owner", async function () {
	// 		const { lock, owner } = await loadFixture(deployOneYearLockFixture);

	// 		expect(await lock.owner()).to.equal(owner.address);
	// 	});

	// 	it("Should receive and store the funds to lock", async function () {
	// 		const { lock, lockedAmount } = await loadFixture(deployOneYearLockFixture);

	// 		expect(await ethers.provider.getBalance(lock.address)).to.equal(lockedAmount);
	// 	});

	// 	it("Should fail if the unlockTime is not in the future", async function () {
	// 		// We don't use the fixture here because we want a different deployment
	// 		const latestTime = await time.latest();
	// 		const Lock = await ethers.getContractFactory("Lock");
	// 		await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith("Unlock time should be in the future");
	// 	});

	// describe("Withdrawals", function () {
	// 	describe("Validations", function () {
	// 		it("Should revert with the right error if called too soon", async function () {
	// 			const { lock } = await loadFixture(deployOneYearLockFixture);

	// 			await expect(lock.withdraw()).to.be.revertedWith(
	// 				"You can't withdraw yet"
	// 			);
	// 		});

	// 		it("Should revert with the right error if called from another account", async function () {
	// 			const { lock, unlockTime, otherAccount } = await loadFixture(
	// 				deployOneYearLockFixture
	// 			);

	// 			// We can increase the time in Hardhat Network
	// 			await time.increaseTo(unlockTime);

	// 			// We use lock.connect() to send a transaction from another account
	// 			await expect(
	// 				lock.connect(otherAccount).withdraw()
	// 			).to.be.revertedWith("You aren't the owner");
	// 		});

	// 		it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
	// 			const { lock, unlockTime } = await loadFixture(
	// 				deployOneYearLockFixture
	// 			);

	// 			// Transactions are sent using the first signer by default
	// 			await time.increaseTo(unlockTime);

	// 			await expect(lock.withdraw()).not.to.be.reverted;
	// 		});
	// 	});

	// 	describe("Events", function () {
	// 		it("Should emit an event on withdrawals", async function () {
	// 			const { lock, unlockTime, lockedAmount } = await loadFixture(
	// 				deployOneYearLockFixture
	// 			);

	// 			await time.increaseTo(unlockTime);

	// 			await expect(lock.withdraw())
	// 				.to.emit(lock, "Withdrawal")
	// 				.withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
	// 		});
	// 	});

	// 	describe("Transfers", function () {
	// 		it("Should transfer the funds to the owner", async function () {
	// 			const { lock, unlockTime, lockedAmount, owner } =
	// 				await loadFixture(deployOneYearLockFixture);

	// 			await time.increaseTo(unlockTime);

	// 			await expect(lock.withdraw()).to.changeEtherBalances(
	// 				[owner, lock],
	// 				[lockedAmount, -lockedAmount]
	// 			);
	// 		});
	// 	});
	// });
});
