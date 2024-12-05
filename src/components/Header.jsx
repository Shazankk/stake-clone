import { Navbar } from "flowbite-react";

const Header = () => (
  <Navbar fluid>
    <Navbar.Brand href="/">
      <img src="/cglogo.png" alt="Logo" className="h-8" />
    </Navbar.Brand>
    <Navbar.Collapse>
      <Navbar.Link href="/" active>
        Home
      </Navbar.Link>
      <Navbar.Link href="/leaderboard">Leaderboard</Navbar.Link>
      <Navbar.Link href="/bonus-hunt">Bonus Hunt</Navbar.Link>
      <Navbar.Link href="/challenges">Challenges</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
