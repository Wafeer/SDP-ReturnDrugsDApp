 pragma solidity >=0.4.22;

contract Lot_Batch{
    //address BatchEA;
    string drugName;
    uint manufacturingDate;
    uint expiryDate;
    address owner;
    uint quantity;
    uint pricePerBox;
    string currentType;
    string public IPFSHash;
    
    mapping (uint=>bool) drugPurchased;
    
    modifier onlyOwner{
      require(msg.sender == owner,
      "Sender not authorized."
      );
      _;
    }    
    
    event LotDispatched(address LotAddress, string DrugName, uint Quantity, uint PricePerBox, address Manufacturer);
    
    event OwnerChanged(address NewOwner, string OwnerType, uint time);

    event DrugSold(address LotAddress, uint boxNumber, uint time);
    
    // string IPFS
    constructor(string memory n, uint mDate, uint eDate, uint Q, uint price, string memory IPFS) public{
       drugName=n;
       manufacturingDate = mDate;
       expiryDate= eDate;
       owner= msg.sender;
       quantity= Q;
       pricePerBox= price;
       IPFSHash = IPFS;
       currentType = "Manufacturer";
       emit LotDispatched(address(this), n, Q, price, owner);
   }
   
   
    function sellDrug(uint boxNumber) public {
       require(!drugPurchased[boxNumber],
        "Drug Box Purchased"
        );
        require(expiryDate>now,
        "Drug has expired"
        );
        quantity--;
        drugPurchased[boxNumber]=true;
        emit DrugSold(address(this), boxNumber, now);
   }
  
   function changeOwner(address newOwner, string memory OT) public onlyOwner{
       owner=newOwner;
       currentType = OT;
       emit OwnerChanged(owner, OT, now);
   }
   
}