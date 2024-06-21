import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { profile } from "../services/api";
const ProfilePage = () => {
  const [prof, setprofile] = useState({});
  useEffect(() => {
    async function getprofile() {
      const token = localStorage.getItem("token");
      const profileinf = await profile(token);
      setprofile(profileinf);
    }
    getprofile();
  }, []);
  return (
    <>
      <Header />
      <div className="position-absolute top-50 start-50 translate-middle border p-5">
        <div className="d-flex">
          <div className="fw-bold">Email:</div>
          <div className="ms-2">{prof.email}</div>
        </div>
        <div className="d-flex">
          <div className="fw-bold">Username: </div>
          <div className="ms-2">{prof.username}</div>
        </div>
        <div className="d-flex">
          <div className="fw-bold">Total Votes: </div>
          <div className="ms-2">{prof.votedPolls?.length}</div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
