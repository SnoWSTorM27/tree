import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, getCurrentUserId, getUserDataStatus, loadCurrentUser } from "../../store/user";
import Loader from "../common/loader";

const NavProfile = () => {
  const dataStatus = useSelector(getUserDataStatus());
  const currentUser = useSelector(getCurrentUserData());
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dataStatus]);
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(prevState => !prevState);
  };
  if (!currentUser) return <Loader />;
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img src={ currentUser.image }
          height="40"
          alt={ currentUser.image }
          className="img-responsive rounded-circle" />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to="/logout" className="dropdown-item">Выйти</Link>
      </div>
    </div>
  );
};

export default NavProfile;
