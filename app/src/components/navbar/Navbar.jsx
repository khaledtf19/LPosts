import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import {
  RiLogoutBoxRLine,
  RiLoginBoxLine,
  RiUser3Line,
  RiUser3Fill,
} from "react-icons/ri";

import { AiOutlineHome, AiFillHome } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";

import { UserContext } from "../../context/user/UserContext";

const Links = () => {
  const [navActiveHome, setNaveActiveHome] = useState(false);
  const [navActiveProfile, setNaveActiveProfile] = useState(false);

  return (
    <>
      <NavLink
        to="/"
        className="navbar__links__link"
        style={({ isActive }) =>
          isActive ? setNaveActiveHome(true) : setNaveActiveHome(false)
        }
      >
        {!navActiveHome ? (
          <AiOutlineHome size="27" />
        ) : (
          <AiFillHome size="27" />
        )}
      </NavLink>
      <NavLink
        to="/profile"
        className="navbar__links__link"
        style={({ isActive }) =>
          isActive ? setNaveActiveProfile(true) : setNaveActiveProfile(false)
        }
      >
        {!navActiveProfile ? (
          <RiUser3Line size="27" />
        ) : (
          <RiUser3Fill size="27" />
        )}
      </NavLink>
    </>
  );
};

function Navbar() {
  const [toggleMenu, seToggleMenu] = useState(false);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = user;

  const [token, setToken] = useState(localStorage.getItem("auth-token") || "");

  const [navActiveLogin, setNaveActiveLogin] = useState(false);
  const [navActiveRegister, setNaveActiveRegister] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("auth-token"));
  }, [userData]);

  return (
    <div className="navbar">
      {userData ? (
        <>
          <ul className="navbar__container">
            <Links />
          </ul>
          <ul className="navbar__buttons">
            <NavLink
              to="/login"
              className="navbar__buttons__button "
              onClick={() => {
                localStorage.removeItem("auth-token");
                setToken(null);
                setUserData(null);
              }}
            >
              <RiLogoutBoxRLine size="27" />
            </NavLink>
          </ul>
        </>
      ) : (
        <ul className="navbar__buttons__container">
          <NavLink
            to="/login"
            className="navbar__buttons__button"
            style={({ isActive }) =>
              isActive ? setNaveActiveLogin(true) : setNaveActiveLogin(false)
            }
          >
            <RiLoginBoxLine size="27" />
          </NavLink>
          <NavLink
            to="/register"
            className="navbar__buttons__button "
            style={({ isActive }) =>
              isActive
                ? setNaveActiveRegister(true)
                : setNaveActiveRegister(false)
            }
          >
            <CgProfile size="27" />
          </NavLink>
        </ul>
      )}
      <div className="navbar-menu">
        {userData ? (
          <ul className="navbar-menu-buttons">
            <div className="navbar__menu-links">
              <Links />
            </div>
            <div className="mobile__nav">
              <NavLink
                to="/login"
                className="navbar__links__link "
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  setToken(null);
                  setUserData(null);
                }}
              >
                <RiLogoutBoxRLine size="27" />
              </NavLink>
            </div>
          </ul>
        ) : (
          <ul className="navbar__menu-links ">
            <NavLink
              to="/login"
              className="navbar__links__link"
              style={({ isActive }) =>
                isActive ? setNaveActiveLogin(true) : setNaveActiveLogin(false)
              }
            >
              <RiLoginBoxLine size="27" />
            </NavLink>
            <NavLink
              to="/register"
              className="navbar__links__link "
              style={({ isActive }) =>
                isActive
                  ? setNaveActiveRegister(true)
                  : setNaveActiveRegister(false)
              }
            >
              <CgProfile size="27" />
            </NavLink>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
