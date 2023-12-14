import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMember from '../Pages/AddMember/AddMember';
import EditMember from '../Pages/EditMember/EditMember';
import DisplayUsers from "../Pages/ListMembers/DisplayUsers";


const Approutes = () => {
  return (
    <>
     <Router>
     <Routes>
            <Route exact path="/" element={<DisplayUsers />} />
            <Route path="AddMember" element={<AddMember />} />
            <Route path="/EditMember" element={<EditMember />} />
            </Routes>
      </Router>

    </>
  );
};

export default Approutes;
