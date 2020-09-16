 pragma solidity >=0.4.22;

contract ReturnedDrugsSummary{
    
    address FDA;
    
    mapping(address=>bool) ApprovedResellers;

    mapping(address=>bool) ApprovedCA;
    
    mapping(address=>bool) returnedDrugPackages;
    
    constructor () public{
        FDA=msg.sender;
    }
    
    modifier onlyFDA{
      require(msg.sender == FDA,
      "Sender not authorized."
      );
      _;
    }    
    
    modifier onlyCA{
      require(ApprovedCA[msg.sender],
      "Sender not authorized."
      );
      _;
    }    
    
    
    function regiterReseller(address Reseller) public onlyFDA{
        require(!ApprovedResellers[Reseller],
            "Reseller exists already"
            );
            
        ApprovedResellers[Reseller]=true;
    }
    
    function regiterCA(address CA) public onlyFDA{
        require(!ApprovedCA[CA],
            "Certification Agency exists already"
            );
            
        ApprovedCA[CA]=true;
    }
    
    function approveReturnedPackage(address EA, string memory name, uint mDate, uint eDate, uint Q, uint price,address reseller) public onlyCA {
        require(ApprovedResellers[msg.sender],
            "Reseller not approved"
            );
        returnedDrugPackages[EA]=true;
    }
    
    
}