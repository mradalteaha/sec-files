//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenRegistry {
    // Define a struct to represent each token
    struct Token {
        address owner;
        string data;
        string fileName;
    }
    
    // Define a mapping to store the tokens for each owner
    mapping(address => mapping(string => Token)) public tokens;
    
    // Define a list of owners
    address[] public owners;
    string[] public savedTokens;

    
    // Define a mapping to track the index of each owner in the owners list
    mapping(address => uint256) public ownerIndex;
    mapping(string => uint256) public tokenIndex;

    
    // Define the constructor to add the contract creator as the first owner
    constructor() {
        addOwner(msg.sender);
    }
    
    // Define a function to add a new owner to the list
    function addOwner(address newOwner) public {
        // Ensure that the owner doesn't already exist
        //require(ownerIndex[newOwner] == 0, "Owner already exists");
        if(ownerIndex[newOwner] == 0){
        owners.push(newOwner);
        ownerIndex[newOwner] = owners.length;
        }else{
            return;
        }
        
        // Add the new owner to the list
       
    }
    
    // Define a function to add a new token for the caller
    function addToken(string memory tokenId, string memory data , string memory fileName) public {
        // Ensure that the caller is an owner
        //if it's not registered owner we add him
        if(!(ownerIndex[msg.sender] > 0)){
            addOwner(msg.sender);
        }

        //require(ownerIndex[msg.sender] > 0, "Caller is not an owner");
        // Ensure that the token doesn't already exist
        require(bytes(tokens[msg.sender][tokenId].data).length == 0, "Token already exists");
        
        // Add the new token to the caller's list
        Token storage newToken = tokens[msg.sender][tokenId];
        newToken.owner = msg.sender;
        newToken.data = data;
        newToken.fileName = fileName;

        savedTokens.push(newToken.data);
        tokenIndex[newToken.data] = savedTokens.length;
    }
    
    // Define a function to update an existing token for the caller
    function updateToken(string memory tokenId, string memory newData) public {
        // Ensure that the caller is the owner of the token
        require(tokens[msg.sender][tokenId].owner == msg.sender, "Caller is not the owner of the token");
        
        // Update the data associated with the token
        tokens[msg.sender][tokenId].data = newData;
    }
    
    // Define a function to view all tokens with their owners
     function viewTokens() public view returns (Token[] memory) {
        
        Token[] memory tokensData = new Token[](savedTokens.length);

        uint256 itemindex = 0 ;
        // Loop through each owner and their tokens
        for (uint256 i = 0; i < owners.length; i++) {
            
            address owner = owners[i];
            for (uint256 j = 0; j < savedTokens.length; j++) {
                if (bytes(tokens[owner][string(savedTokens[j])].data).length > 0) {
                    tokensData[itemindex] =tokens[owner][string(savedTokens[j])];
                    itemindex++;
                }
            }
        }
        
        return (tokensData);
    } 
}
