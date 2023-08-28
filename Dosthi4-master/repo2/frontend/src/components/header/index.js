import "./style.css";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {BiMenuAltLeft} from "react-icons/bi";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import logo from './DOSTHI.png';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
export default function Header() {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allmenu = useRef(null);
  const usermenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">

            {/* <div className="waviy">
              <span style={{ "--i": 1 }}>D</span>
              <span style={{ "--i": 2 }}>O</span>
              <span style={{ "--i": 3 }}>S</span>
              <span style={{ "--i": 4 }}>T</span>
              <span style={{ "--i": 5 }}>H</span>
              <span style={{ "--i": 6 }}>I</span>
            </div> */}
            <img src={logo} alt="logo" className="logo" />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Dosthi"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} token={user.token} />
      )}
      <div className="header_middle">
        <Link to="/" className="middle_icon active">
          <Tooltip title="Home">
            <IconButton>
            <HomeIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/" className="middle_icon hover1">
        <Tooltip title="Friends">
            <IconButton>
            <PeopleAltIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/" className="middle_icon hover1 ">
        <Tooltip title="Gameing & Sports">
            <IconButton>
            <SportsEsportsIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/" className="middle_icon hover1 ">
        <Tooltip title="Videos">
            <IconButton>
            <VideoCameraBackIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
            {/* <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          ref={allmenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <BiMenuAltLeft />
            </div>
          </div> 

          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div> 
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div> */}
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={usermenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div> 
          </div> 

          {showUserMenu && <UserMenu user={user} />}
          </div>
          </div>
    </header>
  );
}
