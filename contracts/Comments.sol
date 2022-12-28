//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Comments {
  // Type Declarations
  struct Comment {
    uint32 id;
    string topic;
    address creator_address;
    string message;
    uint created_at;
  }

  // State Variables
  uint32 private s_idCounter;
  mapping(string => Comment[]) private s_commentsByTopic;

  // Events
  event CommentAdded(Comment comment);

  // Functions
  function getComments(
    string calldata topic
  ) public view returns (Comment[] memory) {
    return s_commentsByTopic[topic];
  }

  function addComment(string calldata topic, string calldata message) public {
    Comment memory comment = Comment({
      id: s_idCounter,
      topic: topic,
      creator_address: msg.sender,
      message: message,
      created_at: block.timestamp
    });
    s_commentsByTopic[topic].push(comment);
    s_idCounter++;

    emit CommentAdded(comment);
  }
}
