import React, { useEffect, useState } from "react";
import { readItems } from '@directus/sdk';
import { client, getTechnologieName } from "../functions/directus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [techNames, setTechNames] = useState({});
    const [selectedProject, setSelectedProject] = useState(null);
  
    useEffect(() => {
        async function fetchProjects() {
            const fetchedProjects = await client.request(
                readItems('Projects', {
                    fields: ['*', {
                        images: ['*'],
                        technologies: ['*']
                    }]
                })
            );
            setProjects(fetchedProjects);

            // Récupération des noms des technologies
            const techMap = {};
            for (const project of fetchedProjects) {
                const techIds = project.technologies.map(tech => tech.Technologies_id);
                const names = await Promise.all(techIds.map(async id => {
                    const techData = await getTechnologieName(id);
                    return techData[0].name;
                }));
                techMap[project.id] = names.join(', ');
            }
            setTechNames(techMap);
        }
        fetchProjects();
    }, []);
  
    function openModal(project) {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    }
  
    function closeModal() {
        setSelectedProject(null);
        document.body.style.overflow = '';
    }
  
    return (
        <section id="projects" className="projects">
            <div className="container">
                <h2 className="section-title">Mes Projets</h2>
                <p className="section-subtitle">Découvrez mes réalisations récentes</p>
                
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card" onClick={() => openModal(project)}>
                            <img src={`https://api.amarquis.fr/assets/${project.thumbnail}`} alt={project.title} width="100%" height="75%" />
                            <h3>{project.title}</h3>
                            <p>{project.short_description}</p>
                            <p><strong>Technologies :</strong> {techNames[project.id] || "Chargement..."}</p>
                        </div>
                    ))}
                </div>
                
                {selectedProject && (
                    <div className="modal active" id="projectModal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}>
                                <i>
                                    <FontAwesomeIcon icon={faTimes} />
                                </i>
                            </button>
                            <h2 className="modal-title">{selectedProject.title}</h2>
                            <div className="project-images">
                                {selectedProject.images.map((src) => (
                                    <img key={src.directus_files_id} src={`https://api.amarquis.fr/assets/${src.directus_files_id}`} alt={selectedProject.title} className="project-image" />
                                ))}
                            </div>
                            <div className="modal-description" dangerouslySetInnerHTML={{ __html: selectedProject.long_description }}></div>
                            
                            <div className="modal-actions">
                                {selectedProject.demo && (
                                    <a className="btn" href={selectedProject.demo} target="_blank">Voir le projet</a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Projects;