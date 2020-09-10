import React from 'react';
import { Button } from 'reactstrap'; 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/"> <Button  type="submit"> Home  </Button> </NavLink>
          <NavLink to="./FDA"> <Button  type="submit"> FDA </Button> </NavLink>
          <NavLink to="./Manufacturers"> <Button  type="submit"> Manufacturers </Button> </NavLink>
          <NavLink to="./Sellers"> <Button  type="submit"> Sellers </Button> </NavLink>
          <NavLink to="./CA"> <Button  type="submit"> CA </Button> </NavLink>
          <NavLink to="./Reseller"> <Button  type="submit"> Reseller </Button> </NavLink>
          <NavLink to="./Patients"> <Button  type="submit"> Patients </Button> </NavLink>

       </div>
    );
}
 
export default Navigation;