import { PROJECTS } from "../constants";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h2 className="my-20 text-center text-4xl">Projects</h2>
        <div>
            {PROJECTS.map((project, index) => (
              <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
                <div className="w-full lg:w-1/4 lg:mr-8"> {/* Added margin-right here */}
                  <motion.img
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 1 }}
                    src={project.image}
                    width={350}
                    height={400}
                    alt={project.title}
                    className="mb-6 rounded"
                  />
                </div>
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1 }}
                  className="w-full max-w-xl lg:w-3/4"
                >
                  <h6 className="mb-2 font-semibold">{project.title}</h6>
                  <p className="mb-4 text-neutral-400">{project.description}</p>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800"
                    >
                      {tech}
                    </span>
                  ))}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800"
                  >
                    View Code
                  </a>
                </motion.div>
              </div>
            ))}
         </div>
    </div>
  );
};

export default Projects;
