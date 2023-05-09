
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 

contract ColorToken is ERC721{
    address public owner;
    uint256 tokenId =1 ;

    struct Color{
        uint tokenId;
        string tokenName;
        address owner;
    }

    Color[] public allTokens;
    mapping(address => Color[]) public tokenAddress;
    mapping(string => bool) public tokenExist;

    constructor() ERC721("ColorToken","CLR"){
        owner = msg.sender;
    }

    function getAllTokens() public view returns (Color[] memory){
    return allTokens;
    }

    function getMyTokens() public view returns (Color[] memory){
        return tokenAddress[msg.sender];
    }

    function mintToken(string calldata _tokenName) public payable {
        require(!tokenExist[_tokenName] ,"Token already exists");
        _safeMint(msg.sender, tokenId);
        allTokens.push(Color(tokenId,_tokenName,msg.sender));
        tokenAddress[msg.sender].push(Color(tokenId,_tokenName,msg.sender));
        tokenExist[_tokenName] = true;
        tokenId++;
    } 
}