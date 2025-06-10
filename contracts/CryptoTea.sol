// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CryptoTea is Ownable, ReentrancyGuard {
    IERC20 public immutable usdtToken;
    
    struct Tea {
        address sender;
        uint256 amount;
        string currency;
        string message;
        uint256 timestamp;
    }
    
    Tea[] public teas;
    mapping(address => uint256) public totalTipsBySender;
    
    uint256 public constant MIN_ETH_TIP = 0.0001 ether;
    uint256 public constant MIN_USDT_TIP = 100000; // 0.1 USDT (6 decimals)
    
    event NewTea(
        address indexed sender,
        uint256 amount,
        string currency,
        string message,
        uint256 timestamp
    );
    
    constructor(address _usdtToken) Ownable(msg.sender) {
        require(_usdtToken != address(0), "Invalid USDT address");
        usdtToken = IERC20(_usdtToken);
    }
    
    function buyTeaWithETH(string calldata message) 
        external 
        payable 
        nonReentrant 
    {
        require(msg.value >= MIN_ETH_TIP, "Minimum 0.0001 ETH");
        require(bytes(message).length > 0, "Empty message");
        require(bytes(message).length <= 200, "Message too long");
        
        Tea memory newTea = Tea({
            sender: msg.sender,
            amount: msg.value,
            currency: "ETH",
            message: message,
            timestamp: block.timestamp
        });
        
        teas.push(newTea);
        totalTipsBySender[msg.sender] += msg.value;
        
        emit NewTea(msg.sender, msg.value, "ETH", message, block.timestamp);
    }
    
    function buyTeaWithUSDT(uint256 amount, string calldata message) 
        external 
        nonReentrant 
    {
        require(amount >= MIN_USDT_TIP, "Minimum 0.1 USDT");
        require(bytes(message).length > 0, "Empty message");
        require(bytes(message).length <= 200, "Message too long");
        
        require(
            usdtToken.allowance(msg.sender, address(this)) >= amount,
            "Insufficient allowance"
        );
        
        bool success = usdtToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed");
        
        Tea memory newTea = Tea({
            sender: msg.sender,
            amount: amount,
            currency: "USDT",
            message: message,
            timestamp: block.timestamp
        });
        
        teas.push(newTea);
        totalTipsBySender[msg.sender] += amount;
        
        emit NewTea(msg.sender, amount, "USDT", message, block.timestamp);
    }
    
    function getAllTeas() external view returns (Tea[] memory) {
        return teas;
    }
    
    function getRecentTeas(uint256 limit) external view returns (Tea[] memory) {
        uint256 length = teas.length;
        if (limit > length) limit = length;
        
        Tea[] memory result = new Tea[](limit);
        for (uint256 i = 0; i < limit; i++) {
            result[i] = teas[length - 1 - i];
        }
        return result;
    }
    
    function withdrawTips() external onlyOwner nonReentrant {
        uint256 ethBalance = address(this).balance;
        uint256 usdtBalance = usdtToken.balanceOf(address(this));
        
        if (ethBalance > 0) {
            (bool success, ) = payable(owner()).call{value: ethBalance}("");
            require(success, "ETH transfer failed");
        }
        
        if (usdtBalance > 0) {
            bool success = usdtToken.transfer(owner(), usdtBalance);
            require(success, "USDT transfer failed");
        }
    }
    
    function getTotalTeas() external view returns (uint256) {
        return teas.length;
    }
    
    function getContractBalance() external view returns (uint256 eth, uint256 usdt) {
        eth = address(this).balance;
        usdt = usdtToken.balanceOf(address(this));
    }
}