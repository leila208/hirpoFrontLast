import React from "react";
import { useState, useEffect } from "react";
function AddChart({ setAddChartModal, memberId,getPositionData }) {
    const [chartName, setChartName] = useState({ name: "", positionlevel: memberId });
      const handleAddChart = (e) => {
        setChartName({ ...chartName, [e.target.name]: e.target.value });
      };
  const handleAdd = async (e) => {
    e.preventDefault();

    const a = await fetch("https://admin.hirpo.net/wizard/PositionAddView/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(chartName),
    })
      .then((a) => a)
      .then((data) => data);
    if (a.status == 403) {
      alert("This position has already been added");
    }
    setAddChartModal(false);
getPositionData();
  };
  return (
    <div className={`modelWrapper open`}>
     
        <div className="test2">
          <label htmlFor="name">Add new name:</label>
          <input
            placeholder="Add new name"
            name="name"
            onChange={handleAddChart}
            value={chartName.name}
            required
          />
          <button
            className="cancel-new"
            onClick={() => {
              setAddChartModal(false);
            }}
          >
            Cancel
          </button>
          <button className="add-new" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    
  );
}

export default AddChart;
