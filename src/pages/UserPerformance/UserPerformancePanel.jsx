import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./userperformance.css";
import refreshToken from "../Auth/Refresh";
function UserPerformancePanel() {
  refreshToken();
  const nav = useNavigate();
  const [departaments, setDepartaments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState();
  const [selectedPositions, setSelectedPositions] = useState([]);
  const project_id = window.localStorage.getItem("project");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://admin.hirpo.net/wizard/depposition/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        nav("/"); // redirect to login page
      } else {
        const departaments = await response.json();
        setDepartaments(departaments);
      }
    };
    getData();
  }, []);

  const handleShow = (departmentposition) => {
    setSelectedPositions((prevSelectedPositions) =>
      prevSelectedPositions.includes(departmentposition)
        ? prevSelectedPositions.filter(
            (selectedPosition) => selectedPosition !== departmentposition
          )
        : [...prevSelectedPositions, departmentposition]
    );
  };
  const [performData, setPerformData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://admin.hirpo.net/eva/EmployeePerformance/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        nav("/");
      } else {
        const a = await response.json();
        setPerformData(a);
      }
    };
    getData();
  }, []);
  console.log(performData)

  const [displayedTableIndices, setDisplayedTableIndices] = useState([]);
let positionNumber = 1;
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="mine-performance-table">
          <div className="mine2">
            <div className="performanceTableContainer">
              {performData.map((a, index) => (
                <>
                  {/* <div className="grab"> */}
                  <div className="mine2">
                    <div className="textDiv">
                      <div className="performUserTexts">
                        <div className="performUserText">
                          <p>
                            {positionNumber++}. Position:
                            <span>{a.position?.name}</span>
                          </p>
                        </div>
                        <div className="performUserText">
                          <p>
                            {""} User:
                            <span>
                              {a.first_name} {a.last_name}
                            </span>
                          </p>
                        </div>
                        <div className="performUserText">
                          <p>
                            Total:<span>{a.total_score?.total2}%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="show"
                      onClick={() =>
                        setDisplayedTableIndices((prevIndices) =>
                          prevIndices.includes(index)
                            ? prevIndices.filter((i) => i !== index)
                            : [...prevIndices, index]
                        )
                      }
                    >
                      {displayedTableIndices.includes(index)
                        ? "Hide table"
                        : "Show table"}
                    </button>
                  </div>
                  {/* </div> */}
                  {displayedTableIndices.includes(index) && (
                    <table className="skill-tds ">
                      <thead>
                        <th>Competencies</th>
                        <th>Weight</th>
                        <th>Manager</th>
                        <th>Coworkers</th>
                        <th>Self</th>
                        <th>Sub</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Total</td>
                          <td>100%</td>
                          <td>{a.total_score.manager}%</td>
                          <td>{a.total_score.cowerker}%</td>
                          <td>{a.total_score.selfscore}%</td>
                          <td>{a.total_score.sub}%</td>
                        </tr>

                        {a.position?.positionlevel?.positionskills?.map(
                          (skill) => (
                            <tr>
                              <td>{skill.name}</td>
                              <td>{Number(skill.weight)?.toFixed(1)}</td>
                              <td>
                                {" "}
                                {a.all_scores?.manager[skill?.name] /
                                a.all_scores?.manager[skill?.name + "say"]
                                  ? a.all_scores?.manager[skill?.name] /
                                    a.all_scores?.manager[skill?.name + "say"]
                                  : "-"}
                              </td>
                              <td>
                                {a.all_scores?.cowerker[skill?.name] /
                                a.all_scores?.cowerker[skill?.name + "say"]
                                  ? a.all_scores?.cowerker[skill?.name] /
                                    a.all_scores?.cowerker[skill?.name + "say"]
                                  : "-"}
                              </td>
                              <td>
                                {a.all_scores?.selfscore[skill?.name] /
                                a.all_scores?.selfscore[skill?.name + "say"]
                                  ? a.all_scores?.selfscore[skill?.name] /
                                    a.all_scores?.selfscore[skill?.name + "say"]+'%'
                                  : "-"}
                              </td>
                              <td>
                                {a.all_scores?.sub[skill?.name] /
                                a.all_scores?.sub[skill?.name + "say"]
                                  ? a.all_scores?.sub[skill?.name] /
                                    a.all_scores?.sub[skill?.name + "say"]
                                  : "-"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="chart-btns">
            <Link to="/matrix">
              <button>Go back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPerformancePanel;
