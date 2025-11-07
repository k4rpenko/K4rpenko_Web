import styles from "./page.module.css";
import { FaGithub, FaGooglePlay, FaGlobe } from 'react-icons/fa';

interface ProjectLink {
  icon: React.ReactElement;
  href: string;
  label: string;
}

interface Project {
  do: boolean;
  name: string;
  description: string;
  logo: string;
  Any: string;
  rotate: number;
  left: string;
  bottom: string;
  width: string; 
  height: string;
  flip: boolean;
  links: ProjectLink[];
  progress?: number;
}

interface ProjectCardProps {
  project: Project;
}

export default function Three() {

  
  const project1 = {
    do: false,
    name: "Povidom",
    description: "social network",
    logo: "/logo/Leaf.png",
    Any: "/logo/Any/Povidom.png",
    rotate: -10,
    left: "-220px",
    bottom: "-10px",
    width: "100%",
    height: "120px",
    flip: true,
    links: [
      { icon: <FaGithub />, href: "https://github.com/k4rpenko/Povidom", label: "GitHub" },
    ],
    progress: 84,
  };
   const project2 = {
    do: false,
    name: "Dostavka",
    description: "logistika",
    logo: "/logo/Frame 66.svg",
    Any: "/logo/Any/Dostavka.svg",
    rotate: 0,
    left: "-20px",
    bottom: "-5px",
    width: "100%",
    height: "130px",
    flip: false,
    links: [
      { icon: <FaGithub />, href: "https://github.com/k4rpenko/Dostavka", label: "GitHub" },
    ],
    progress: 78,
  };

  const project3 = {
    do: true,
    name: "Kapital",
    description: "Mobile app for planning and managing purchases ",
    logo: "/logo/ic_launcher.png",
    Any: "/logo/Any/Kapital.png",
    rotate: 0,
    left: "10px",
    bottom: "-170px",
    width: "100%",
    height: "300px",
    flip: false,
    links: [
      { icon: <FaGooglePlay />, href: "https://play.google.com/store/apps/details?id=com.kapital.app", label: "Play Market" },
      { icon: <FaGlobe />, href: "", label: "Web Site" },
    ],
  };

  const ProjectCard: React.FC<ProjectCardProps> = ({ project })  => (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={project.logo} alt={`${project.name} Logo`} className={styles.logo} />
        <div className={styles.info}>
          <h3 className={styles.title}>{project.name}</h3>
          <p className={styles.description}>{project.description}</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.AnyBox}>
          <p></p>
          <div className={styles.AnyBox}>
            <div
              className={styles.AnyThink}
              style={{
                bottom: project.bottom,
                left: project.left,
                transform: `rotate(${project.rotate}deg) scaleX(${project.flip ? -1 : 1})`
              }}
            >
              <img
                src={project.Any}
                alt={`${project.name} preview`}
                className={styles.AnyPhoto}
                style={{
                  width: project.width,
                  height: project.height
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.ProgresAndLinks}>
          {project.links && (
            <div className={styles.linksContainer}>
              {project.links.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.linkButton}
                >
                  {link.icon}
                  <span className={styles.linkText}>{link.label}</span>
                </a>
              ))}
            </div>
          )}
        
          {project.progress !== undefined && (
            <div className={styles.progressContainer}>
              <div className={styles.progresText}>
                <span className={styles.progressLabel}>Прогрес</span>
                <span className={styles.progressPercent}>{project.progress}%</span>
              </div>
              
              <div className={styles.progressBarWrapper}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <ProjectCard project={project1} />
        <ProjectCard project={project2} />
        <ProjectCard project={project3} />
      </div>
    </div>
  );
}