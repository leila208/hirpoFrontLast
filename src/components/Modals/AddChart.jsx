import React from "react";
import { useState, useEffect } from "react";
function AddChart({
  setAddChartModal,
  memberId,
  getPositionData,
  reports,
  handleInput,
}) {
  const [chartName, setChartName] = useState({
    name: "",
    positionlevel: memberId,
    reportto: "",
  });
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
        <label htmlFor="name">Edit Position</label>
        <input
          placeholder="Edit name"
          name="name"
          onChange={handleAddChart}
          value={chartName.name}
          required
        />
        <div className="select">
          {" "}
          <select onChange={(e) => handleInput(e.target.value, memberId)}>
            <option value="default">Select Report To</option>
            <option value="Ceo">Ceo</option>
            {reports.map((a) => (
              <option value={a.id} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="cancel-new"
          onClick={() => {
            setAddChartModal(false);
          }}
        >
          Cancel
        </button>
        <button className="add-new" onClick={handleAdd}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddChart;
