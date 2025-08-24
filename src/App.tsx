import React from 'react';

function App() {
  // TODO: Replace these with your actual information
  const personalInfo = {
    name: "Your Name Here",
    title: "DevOps Engineer & Full Stack Developer",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "Your City, Country",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  };

  const skills = [
    "React", "TypeScript", "Node.js", "Python",
    "Docker", "Kubernetes", "Terraform", "AWS",
    "CI/CD", "GitHub Actions", "Jenkins", "Git"
  ];

  const projects = [
    {
      name: "CI/CD Portfolio Pipeline",
      description: "Automated deployment pipeline using GitHub Actions, Docker, and Kubernetes",
      tech: ["React", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
      status: "In Progress"
    },
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce application with payment integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{personalInfo.name}</h1>
            <div className="space-x-4">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#skills" className="text-gray-600 hover:text-blue-600 transition-colors">Skills</a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Hello, I'm {personalInfo.name}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {personalInfo.title}
            </p>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Passionate about building scalable applications and automating deployment processes. 
              Experienced in modern web technologies and DevOps practices.
            </p>
            <div className="space-x-4">
              <a 
                href="#projects" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors inline-block"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Skills & Technologies</h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 px-4 py-3 rounded-lg text-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Projects</h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-semibold text-gray-800">{project.name}</h4>
                  <span className={`px-2 py-1 rounded text-sm ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Get In Touch</h3>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-8">
              I'm always interested in new opportunities and collaborations. 
              Feel free to reach out if you'd like to work together!
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span>📧</span>
                <span>{personalInfo.email}</span>
              </a>
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span>💼</span>
                <span>LinkedIn Profile</span>
              </a>
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span>🐱</span>
                <span>GitHub Profile</span>
              </a>
              <div className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <span>📍</span>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {personalInfo.name}. Built with React, Tailwind CSS, and deployed via CI/CD.</p>
          <p className="text-gray-400 mt-2">This portfolio demonstrates automated deployment using GitHub Actions, Docker, and Kubernetes.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;