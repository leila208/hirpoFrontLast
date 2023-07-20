import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import chart_user from "../../components/images/chart_user.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Departament from "../../components/ChartComponents/Departament";
import ChartModal from "../../components/Modals/ChartModal/ChartModal";
import ModalDepartament from "../../components/Modals/ChartModal/ModalDepartament";
import "../Chart/chart.css";
import refreshToken from "../Auth/Refresh";
import "./selfchart.css";
const SelfChart = () => {
  refreshToken();
  const nav = useNavigate();
  const [departaments, setDepartaments] = useState([]);
  const project_id = window.localStorage.getItem("project");
   const getData = async () => {
     const token = localStorage.getItem("access_token");
     const response = await fetch("https://admin.hirpo.net/wizard/depposition/", {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     if (response.status === 401) {
       nav("/");
     } else {
       const departaments = await response.json();
       setDepartaments(departaments);
     }
   };
  useEffect(() => {
   
    getData();
  }, []);
  const handleDelete = async () => {
    const data2 = await fetch("https://admin.hirpo.net/wizard/goback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ project: project_id }),
    })
      .then((result) => result)
      .then((response) => response.json());
  };
  const [single, setSingle] = useState(false);
  useEffect(() => {
    setSingle(departaments.length <= 2);
  }, [departaments]);
  const [chartModal, setChartModal] = useState(false);
  return (
    <>
      {chartModal && (
        <ChartModal setChartModal={setChartModal} getData={getData} />
      )}
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="chart-part">
          <div className="container">
            <ul className="chart">
              <li className="chartContent">
                <img className="chartIcon" src={chart_user} />
                <ul
                  className={` ${
                    single ? "center-departaments" : "departaments"
                  }`}
                >
                  {chartModal == "true"
                    ? departaments.map((a, b) => (
                        <li>
                          <ModalDepartament departament={a} key={b} />
                        </li>
                      ))
                    : departaments.map((a, b) => (
                        <Departament departament={a} key={b} />
                      ))}
                </ul>
              </li>
            </ul>
            <div className="chart-btns">
              {/* <Link to="/wizard">
                <button onClick={handleDelete}>Go back</button>
              </Link> */}
              <button onClick={() => setChartModal(true)}>Edit</button>
              {/* <Link to="/matrix">
                <button className="magic">Continue</button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfChart;
