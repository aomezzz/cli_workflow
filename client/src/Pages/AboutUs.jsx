import React from 'react';
import Navbar from '../Component/Navbar';
import { Link } from 'react-router';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Frontend Developer",
      role: "React & UI/UX Specialist",
      description: "Responsible for creating beautiful and responsive user interfaces",
      skills: ["React", "Tailwind CSS", "DaisyUI", "JavaScript", "HTML/CSS"]
    },
    {
      name: "Backend Developer", 
      role: "Server & Database Specialist",
      description: "Handles server-side logic, APIs, and database management",
      skills: ["Node.js", "Express", "Database Management", "RESTful APIs"]
    },
    {
      name: "Full Stack Developer",
      role: "Integration & Architecture",
      description: "Bridges frontend and backend, ensures smooth integration",
      skills: ["Full Stack Development", "System Architecture", "DevOps", "Testing"]
    }
  ];

  const features = [
    {
      icon: "🍽️",
      title: "Restaurant Management",
      description: "Add, update, and delete restaurant information easily"
    },
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Search restaurants by name, type, or cuisine with advanced filters"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Beautiful interface that works on all devices"
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      description: "Optimized for speed with modern web technologies"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">About Grab Restaurant</h1>
            <p className="mb-5 text-lg">
              Your ultimate restaurant discovery and management platform, 
              built with passion by a dedicated team of developers.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* Project Overview */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Project</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Grab Restaurant is a modern web application that allows users to discover, 
              manage, and explore restaurants. Built with cutting-edge technologies, 
              it provides a seamless experience for restaurant enthusiasts.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="card-title justify-center text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-gray-600">
              Meet the talented developers behind Grab Restaurant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-16">
                      <span className="text-xl">👤</span>
                    </div>
                  </div>
                  <h3 className="card-title text-lg">{member.name}</h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="badge badge-outline badge-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
            <p className="text-lg text-gray-600">
              Built with modern and reliable technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="badge badge-primary badge-sm">⚛️</span>
                    React 19 - Modern UI library
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-secondary badge-sm">🎨</span>
                    Tailwind CSS - Utility-first CSS framework
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-accent badge-sm">🌸</span>
                    DaisyUI - Beautiful component library
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-info badge-sm">⚡</span>
                    Vite - Fast build tool
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-warning badge-sm">🧭</span>
                    React Router - Client-side routing
                  </li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">Development</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="badge badge-error badge-sm">📦</span>
                    Docker - Containerization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-success badge-sm">🔧</span>
                    ESLint - Code quality
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-neutral badge-sm">🔄</span>
                    Git - Version control
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-ghost badge-sm">📱</span>
                    Responsive Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="badge badge-outline badge-sm">🚀</span>
                    Modern JavaScript (ES6+)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl">Ready to explore restaurants?</h2>
              <p className="mb-4">Start discovering amazing restaurants in your area!</p>
              <div className="card-actions justify-center">
                <Link to="/" className="btn btn-ghost btn-lg">
                  Browse Restaurants
                </Link>
                <Link to="/add-restaurant" className="btn btn-outline btn-lg">
                  Add Restaurant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
