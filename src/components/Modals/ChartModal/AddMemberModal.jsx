import React, { useState, useEffect } from "react";
import "../modals.css";

  function AddMemberModal({
    setAddMemberModal,
    setSelecteds,
    selecteds,
    selectedDepartamentId,
    getPositionData,
  }) {
{
  
}
    const [newMemberName, setNewMemberName] = useState("");
   const [selects, setSelects] = useState({
     department: "",
     name: "",
   });
    

       const handleAddMember = async (e) => {
         // window.location.reload();
         
         e.preventDefault();
     
         const a = await fetch(
           "http://127.0.0.1:8000/wizard/CreatePositionView/",
           {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
             },
             body: JSON.stringify({
               department: selectedDepartamentId,
               name: newMemberName,
             }),
           }
         )
           .then((a) => a)
           .then((data) => data);
         if (a.status == 403) {
  alert("This position has already been added")
}
         setAddMemberModal(false);
         getPositionData();
       };
  // useEffect(() => {
    
  //   getF();
  // }, []);
    return (
      <>
        <div className={`modalWrapper open`}>
          <div className="addMemberModal">
            <div className="test">
              <select
                name="newMemberName"
                onChange={(e) => setNewMemberName(e.target.value)}
                defaultValue={"DEFAULT"}
                required
              >
                {/* //1 in secende */}
                <option value="DEFAULT" disabled>
                  Select position level
                </option>
                <option value="Junior">Junior</option>
                <option value="Specialist">Specialist</option>
                <option value="Senior">Senior</option>
                <option value="Manager">Manager</option>
              </select>

              <button
                className="cancel-new"
                onClick={() => {
                  setAddMemberModal(false);
                }}
              >
                Cancel
              </button>
              <button className="add-new" onClick={handleAddMember}>
                Add
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
export default AddMemberModal;
