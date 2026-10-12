import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I am a dedicated bioinformatician and machine learning enthusiast with experience in computational research and data analysis. Throughout my academic journey, I have developed expertise in handling large datasets and building predictive models using tools like Python and PyTorch. My focus is on utilizing machine learning techniques to solve complex problems in healthcare and biomedical research. I am driven by a desire to apply these skills to advance research and drive meaningful outcomes in both healthcare and business settings.`;

export const ABOUT_TEXT = `As a Biomedical Engineering graduate and a Medical Biology master's student, I have a solid foundation in bioinformatics, data analysis, and computational research. I have experience working with large datasets and have contributed to various research initiatives in the biomedical domain. My skills include developing algorithms, visualizing data, and solving problems collaboratively through internships and academic projects. I am known for clear communication and effective teamwork, with a strong interest in using machine learning to solve complex challenges and improve healthcare or business outcomes.`;

export const EXPERIENCES = [
  {
    year: "06/2024 - Present",
    role: "AI Specialist & Bioinformatician",
    company: "University of Salzburg",
    description: `Led the development and implementation of machine learning models to analyze large-scale genomic datasets, resulting in the identification of potential mutations. Collaborated with cross-functional teams to integrate biological data with computational models, enhancing predictive accuracy by 20%.
 Applied AI techniques to predict protein structures, significantly improving the speed and accuracy of predictions`,
    technologies: ["Python", "Pytorch", "Scikit-learn", "Panadas"],
  },
  {
    year: "01/2022 - 09/2022",
    role: "Data Analyst",
    company: "Berlitz-brazil, Brazil",
    description: `Analyzed commercial and customer activity data from over 1000+ records, leading to 
actionable insights that improved marketing strategy, resulting in a 10% increase in customer engagement. Led data collection and cleansing efforts, processing and standardizing 10,000+ data points 
weekly to enhance accuracy for predictive models, improving model reliability by 15%. Developed and implemented a technical solution roadmap that reduced noise in sales data
 by 20%, leading to a 5% improvement in forecast accuracy. 
`,
    technologies: ["PostgreSQL", "Python", "Matplotlib", "PowerBi"],
  },
  {
    year: "09/2021 - 09/2022",
    role: "Medical Engineer",
    company: "Medical Park Istanbul",
    description: `Maintaining project timelines for maintenance and quality control, ensuring 
98% uptime of medical devices, which led to 0% critical device failures over a 12-month period.
Analyzed market research data to support purchasing decisions, resulting in the acquisition
of 10 new medical devices that enhanced operational efficiency by 15%.
Created and presented over 50 medical reports per quarter, providing key insights 
that supported 20% improvement in clinical decision-making processes.`,
    technologies: ["Medical device trouble-shooting", "Endoscopy Devices", "ISO 13485", "ISO 9001"],
  },
  {
    year: "05/2018 - 10/2018",
    role: "Medical Engineer",
    company: "Cairo General Hospital",
    description: `Designed and executed medical devices preventative maintenance plans. Calibrated and maintained incubators, patient monitors, and ventilators.`,
    technologies: ["Medical device trouble-shooting", "ECG", "Ventilators", "ISO 27001"],
  },
];

export const PROJECTS = [
  {
    title: "Protein Mutations Predictor",
    image: project1,
    description: "This project develops a machine learning model using PyTorch to predict continuous target variables for protein mutations. It allows fine-tuning of hyperparameters, supports both numerical and categorical features, and uses techniques like K-fold cross-validation. The model tracks and saves best-performing configurations and includes SHAP visualizations to explain predictions, making it applicable in bioinformatics and healthcare for analyzing protein mutation effects.",
    technologies: ["Python", "PyTorch", "Pandas", "Scikit-learn", "Matplotlib"],
    github: "https://github.com/webj-khaled/Genetic-mutations-detector"
  },
  {
    title: "Car Price Prediction",
    image: project2,
    description: "This project focuses on predicting car prices using two models: Linear Regression and Decision Tree Regression. The dataset is validated, transformations like log transformation on price and encoding of categorical variables are applied. Exploratory analysis is performed to uncover relationships between variables. The Decision Tree model outperforms the Linear Regression model based on R-squared and RMSE metrics, making it more suitable for deployment.",
    technologies: ["Python", "Pandas", "Seaborn", "Scikit-learn", "Matplotlib"],
    github: "https://github.com/webj-khaled/Used-cars-market-analysis"
  },
  {
    title: "Portfolio Website",
    image: project3,
    description: "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "Bootstrap"],
    github: "https://github.com/webj-khaled/Main-portfolio"
  },
  {
    title: "Automated Email Processing System",
    image: project4,
    description: "This project automates the classification and processing of customer emails using OpenAI’s GPT-3 API. Emails are categorized as either order requests or product inquiries, and relevant product details and quantities are extracted from orders. After checking stock availability, the system updates the stock database and generates email responses based on order fulfillment status. For inquiries, responses are generated using the product catalog descriptions. The project integrates Excel files to handle data and automates the entire process, improving efficiency in customer service operations.",
    technologies: ["Python", "OpenAI GPT-3", "Pandas", "Excel", "gspread"],
    github: "https://github.com/webj-khaled/Solving-business-problems-with-AI"
  },
];


export const CONTACT = {
  address: " 5020, Salzburg, Austria ",
  phoneNo: "+43 676 3817 666 ",
  email: "elfahamkhaled65@gmail.com",
};
