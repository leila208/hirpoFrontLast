import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../UserPerformance/userperformance.css";
import "./projects.css";
import partimg from "../../components/images/selftodo.png";
import periodIcon from "../../components/images/periodIcon.png";
import PeriodModal from "../../components/Modals/PeriodModal";
import FrequencyModal from "../../components/Modals/FrequencyModal";
import refreshToken from "../Auth/Refresh";
import NewProjectModal from "../../components/Modals/ChartModal/NewProjectModal";
import DashBoard from "../DashBoard/DashBoard";
function Projects() {
  const nav = useNavigate();
  refreshToken();

  const [openProjectId, setOpenProjectId] = useState(null);
  const project_id = window.localStorage.getItem("project");

  const [projectData, setProjectData] = useState([]);
  const getData = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch("https://admin.hirpo.net/eva/ProjectsApiView/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setProjectData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const projectId = projectData[0]?.id;

  //  const projectPositions=
  const [frequencies, setFrequencies] = useState([]);
  const getFreData = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch("https://admin.hirpo.net/eva/Frequencies/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setFrequencies(data);
  };
  useEffect(() => {
    
    getFreData();
  }, []);

  const projects = projectData?.map((project) => {
    return {
      ...project,
      showDetails: false,
    };
  });

  const period = projects.map((obj) => obj.period.map((period) => period));

  const handleToggleSwitch = (projectId) => {
    setOpenProjectId(projectId === openProjectId ? null : projectId);
  };
  const [periodModal, setPeriodModal] = useState(false);
  const [frequencyModal, setFrequencyModal] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  return (
    <>
      <Navbar />
      <div className="total-second">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="self-container">
          <div className="self-head">
            <div className="matrix-text">
              <p>Projects</p>
            </div>
          </div>

          <div className="self-projects">
            {periodModal && (
              <PeriodModal
                projectData={projectData}
                getData={getData}
                setPeriodModal={setPeriodModal}
                projectId={projectId}
              />
            )}
            {frequencyModal && (
              <FrequencyModal
                getFreData={getFreData}
                setFrequencyModal={setFrequencyModal}
                period={period}
              />
            )}
            {newProjectModal && (
              <NewProjectModal
                getData={getData}
                setNewProjectModal={setNewProjectModal}
                projectId={projectId}
              />
            )}

            {projects.map((project) => (
              <div key={project?.id}>
                <div className="project-name">
                  <div className="project-text">{project.project_name}</div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      onClick={() => handleToggleSwitch(project.id)}
                    />{" "}
                    <div className="toggle-switch-background">
                      <div className="toggle-switch-handle"></div>
                    </div>
                  </label>
                </div>
                {openProjectId !== project.id && (
                  <div className="self-body">
                    <div className="competency-part">
                      <div className="project-header">
                        <div className="part-text">
                          <p>Project period(s)</p>
                          <div className="part-img">
                            <img src={partimg} />
                          </div>
                        </div>
                        <button
                          className="add-member"
                          onClick={() => setPeriodModal(true)}
                        >
                          +
                        </button>
                      </div>
                      <div className="part-body">
                        <div className="period-head-text">
                          <p>Positions</p>
                          <p>Frequency</p>
                        </div>

                        {project.period.map((period) => {
                          return (
                            <>
                              <div className="periods">
                                <hr className="periodLine" />
                                <div className="period">
                                  <div className="period-left">
                                    <div>
                                      <img
                                        src={periodIcon}
                                        className="periodIcon"
                                      />
                                      <p>
                                        {period.period_number}. Period{" "}
                                        {period.period_number} :
                                      </p>
                                      <span>
                                        {period.start_date} - {period.end_date}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="period-right">
                                    <p>{period?.position_count}</p>

                                    <p>{period.frequency.length}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>

                      <div className="goal-part">
                        <div className="project-header">
                          <div className="part-text">
                            <p>Frequency(ies)</p>

                            <div className="part-img">
                              <img src={partimg} />
                            </div>
                          </div>
                          <button
                            className="add-member"
                            onClick={() => setFrequencyModal(true)}
                          >
                            +
                          </button>
                        </div>
                        <div className="part-body">
                          <div className="period-head-text">
                            <p>Assessment time</p>
                          </div>

                          {frequencies?.map((period) => {
                            return (
                              <div className="periods">
                                <hr className="periodLine" />
                                <div className="period">
                                  <div className="period-left">
                                    <div>
                                      <img
                                        src={periodIcon}
                                        className="periodIcon"
                                      />
                                      <p>
                                        {period.period?.period_number}. Period
                                        {period.period?.period_number} /F
                                        {period.freq_number} :
                                      </p>

                                      <span>
                                        {period.start_date} {""}{" "}
                                        {period.end_date}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="period-right"></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {projectData.length == 0 && (
            <div className="create">
              <button onClick={() => setNewProjectModal(true)}>
                Create Project
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
