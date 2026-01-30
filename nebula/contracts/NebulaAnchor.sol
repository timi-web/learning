// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NebulaAnchor {
    address public owner;

    event EventAnchored(bytes32 indexed eventHash, bytes32 indexed projectId, uint256 timestamp);
    event MerkleRootAnchored(bytes32 indexed merkleRoot, uint256 indexed dayTimestamp, uint256 eventCount);

    mapping(bytes32 => bool) public anchored;
    mapping(uint256 => bytes32) public dailyRoots;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function anchorEvent(bytes32 eventHash, bytes32 projectId) external onlyOwner {
        require(!anchored[eventHash], "Already anchored");
        anchored[eventHash] = true;
        emit EventAnchored(eventHash, projectId, block.timestamp);
    }

    function anchorBatch(bytes32[] calldata eventHashes, bytes32[] calldata projectIds) external onlyOwner {
        require(eventHashes.length == projectIds.length, "Length mismatch");
        for (uint256 i = 0; i < eventHashes.length; i++) {
            if (!anchored[eventHashes[i]]) {
                anchored[eventHashes[i]] = true;
                emit EventAnchored(eventHashes[i], projectIds[i], block.timestamp);
            }
        }
    }

    function anchorDailyRoot(bytes32 merkleRoot, uint256 dayTimestamp, uint256 eventCount) external onlyOwner {
        require(dailyRoots[dayTimestamp] == bytes32(0), "Day already anchored");
        dailyRoots[dayTimestamp] = merkleRoot;
        emit MerkleRootAnchored(merkleRoot, dayTimestamp, eventCount);
    }

    function verify(bytes32 eventHash) external view returns (bool) {
        return anchored[eventHash];
    }

    function getDailyRoot(uint256 dayTimestamp) external view returns (bytes32) {
        return dailyRoots[dayTimestamp];
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
