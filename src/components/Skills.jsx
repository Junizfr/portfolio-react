import React, { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import { client } from "../functions/directus.js";

function Skills() {
  const [skills, setSkills] = useState({ frontend: [], backend: [], tools: [] });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await client.request(
          readItems("Skills", {
            fields: ["*", { category: ["*"] }],
          })
        );
        
        const categorizedSkills = { frontend: [], backend: [], tools: [] };
        
        skillsData.forEach((skill) => {
          switch (skill.category.name) {
            case "Frontend":
              if (categorizedSkills.frontend.length < 3) {
                categorizedSkills.frontend.push(skill);
              }
              break;
            case "Backend":
              if (categorizedSkills.backend.length < 3) {
                categorizedSkills.backend.push(skill);
              }
              break;
            case "Tools":
              if (categorizedSkills.tools.length < 3) {
                categorizedSkills.tools.push(skill);
              }
              break;
            default:
              break;
          }
        });
        
        setSkills(categorizedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const formatSkill = (skill) => (
    <div className="skill-item" key={skill.id}>
      <div className="skill-info">
        <span>{skill.name}</span>
        <span className="percentage">{skill.progress}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${skill.progress}%` }}></div>
      </div>
    </div>
  );

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Compétences</h2>
        <p className="section-subtitle">Technologies et outils que je maîtrise</p>

        <div className="skills-container">
          <div className="skills-column">
            <h3 className="skills-category">
              <i className="fas fa-laptop-code"></i> Front-end
            </h3>
            <div className="skills-box">{skills.frontend.map(formatSkill)}</div>
          </div>

          <div className="skills-column">
            <h3 className="skills-category">
              <i className="fas fa-server"></i> Back-end
            </h3>
            <div className="skills-box">{skills.backend.map(formatSkill)}</div>
          </div>

          <div className="skills-column">
            <h3 className="skills-category">
              <i className="fas fa-tools"></i> Outils & Autres
            </h3>
            <div className="skills-box">{skills.tools.map(formatSkill)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;