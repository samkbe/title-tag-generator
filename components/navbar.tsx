import Logo from "../public/tt-logo.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";

export function NavBar() {
  const pictureRef = useRef(null);
  const [open, setOpen] = useState(false);
  const session = useSession();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-screen border-b-2 flex justify-center">
      <div className="w-full flex flex-row justify-between items-center p-4 max-w-7xl">
        <Image height={40} src={Logo} alt="SEO Gen logo" />
        {session.data?.user?.image && (
          <div>
            <Image
              ref={pictureRef}
              onClick={() => {
                setOpen(!open);
              }}
              className="rounded-full cursor-pointer"
              src={session.data.user.image}
              alt="pfp"
              height={40}
              width={40}
            />
            <Menu
              id="basic-menu"
              anchorEl={pictureRef.current}
              open={open}
              onClose={handleClose}
              aria-labelledby="basic-demo-button"
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={() => signOut()}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}
