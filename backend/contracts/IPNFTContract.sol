//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract IP_NFTContract is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(address => bool) public brightlist;
    mapping(uint256 => ContractData) public contractData;

    struct ContractData {
        string contractData;
        string description;
    }

    event NewMinter(address indexed _minter);
    event RevokedMinter(address indexed _minter);
    event NewToken(address indexed _minter, uint256 indexed tokenId);

    modifier hasBrightlisted() {
        require(brightlist[_msgSender()], "NOT_IN_WHITELIST");
        _;
    }

    constructor() ERC721("IP_NFTContract", "IP-NFT") {}

    /**
     * @notice Add to brightlist
     */
    function addToBrightlist(address _userAddress) public onlyOwner {
        brightlist[_userAddress] = true;
        emit NewMinter(_userAddress);
    }

    /**
     * @notice Remove from brightlist
     */
    function removeFrombrightlist(address _userAddress) public onlyOwner {
        delete brightlist[_userAddress];
        emit RevokedMinter(_userAddress);
    }

    function safeMint(
        address _to,
        string memory _description,
        string memory _contractData
    ) public hasBrightlisted {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();

        contractData[newTokenId].description = _description;
        contractData[newTokenId].contractData = _contractData;

        removeFrombrightlist(_to);
        _safeMint(_to, tokenId);

        emit NewToken(_to, newTokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);

        ContractData memory _contractData = contractData[tokenId];

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":token #',
                        _tokenIdCounter.current(),
                        '"description":',
                        _contractData.description,
                        '"contractData":',
                        _contractData.contractData,
                        '"}'
                    )
                )
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
    }
}
