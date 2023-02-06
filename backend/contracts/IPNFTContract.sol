//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract IP_NFTContract is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    mapping(address => bool) public brightlist;
    mapping(uint256 => NFTData) public nftData;

    struct NFTData {
        string contractData;
        string description;
    }

    event NewMinter(address indexed _minter);
    event RevokedMinter(address indexed _minter);
    event NewToken(address indexed _minter, uint256 indexed tokenId);

    modifier hasBrightlisted() {
        require(brightlist[_msgSender()], "NOT_IN_BRIGHTLIST");
        _;
    }

    constructor() ERC721("IP_NFTContract", "IP-NFT") {
        addToBrightlist(_msgSender());
    }

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
        string memory _description,
        string memory _contractData
    ) public hasBrightlisted {
        uint256 tokenId = _tokenIdCounter.current();

        nftData[tokenId].description = _description;
        nftData[tokenId].contractData = _contractData;
        _tokenIdCounter.increment();

        delete brightlist[_msgSender()];

        _safeMint(_msgSender(), tokenId);

        emit NewToken(_msgSender(), tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);

        NFTData memory _nftData = nftData[tokenId];
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "token #',
            tokenId.toString(),
            '",',
            '"description": "this token can cure ',
            _nftData.description,
            '",',
            '"contractData": "',
            _nftData.contractData,
            '"',
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }
}
