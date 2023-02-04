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
        string name;
    }

    event NewMinter(address indexed _minter);
    event RevokedMinter(address indexed _minter);
    event NewToken(uint256 indexed tokenId);

    constructor() ERC721("IP_NFTContract", "IP-NFT") {}

    modifier hasBrightlisted() {
        require(brightlist[_msgSender()], "NOT_IN_WHITELIST");
        _;
    }

    /**
     * @notice Add to brightlist
     */
    function addToBrightlist(address _userAddress) public onlyOwner {
        brightlist[_userAddress] = true;
    }

    /**
     * @notice Remove from brightlist
     */
    function removeFrombrightlist(address _userAddress) public onlyOwner {
        delete brightlist[_userAddress];
    }

    function safeMint(address _to, string memory uri) public hasBrightlisted {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        removeFrombrightlist(_to);
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, uri);
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
                        '{"name":',
                        _contractData.name,
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
