import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./Navbar.style";
import Homeprofile from "../../pages/home/left/Homeprofile";
import { Link } from "react-router-dom";
import { colors } from "@material-ui/core";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
        {!extendNavbar && <Logo>
          <Link to='/' style={{textDecoration:"none",color:"black"}}>
          NoteSharing
          </Link>
          </Logo>}
      </LeftContainer>
        <RightContainer>
        <NavbarLinkContainer>
            <NavbarLink to="/"> Home</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <Homeprofile />
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;