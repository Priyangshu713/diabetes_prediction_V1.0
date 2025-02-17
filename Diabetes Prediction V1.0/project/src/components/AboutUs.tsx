import React from 'react';
import { Container } from './ui/Container';
import { Card } from './ui/Card';
import { Github, Linkedin, Mail, Code, Palette, Brain, Database } from 'lucide-react';
import TeamMemberCard from './about/TeamMemberCard';
import priyangshu from '../assets/priyangshu.jpg';
import tarak from '../assets/tarak.png';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-6">Our Mission</h1>
          <Card className="p-8 mb-12">
            <p className="text-gray-300 leading-relaxed mb-6">
              Diabetes is a global health concern. Our mission is to leverage technology and machine learning to provide accessible, accurate diabetes risk assessments.
            </p>
            <p className="text-gray-300 leading-relaxed">
              By combining medical knowledge with advanced algorithms, we enable early risk identification, timely intervention, and better health outcomes.
            </p>
          </Card>

          <h2 className="text-3xl font-bold text-white text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamMemberCard
              name="Priyangshu Dutta"
              role="Backend Developer & ML Engineer"
              avatarUrl={priyangshu}
              skills={[
                { icon: <Database className="w-4 h-4" />, label: "Backend Development" },
                { icon: <Brain className="w-4 h-4" />, label: "Machine Learning" },
                { icon: <Palette className="w-4 h-4" />, label: "UI Design" }
              ]}
              socialLinks={[
                { icon: <Github className="w-5 h-5" />, url: "https://github.com/yourusername" },
                { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/yourusername" },
                { icon: <Mail className="w-5 h-5" />, url: "mailto:your.email@example.com" }
              ]}
            />

            <TeamMemberCard
              name="Tarak nath Jana"
              role="Frontend Developer"
              avatarUrl={tarak}
              skills={[
                { icon: <Code className="w-4 h-4" />, label: "Frontend Development" },
                { icon: <Database className="w-4 h-4" />, label: "API Integration" },
                { icon: <Palette className="w-4 h-4" />, label: "UI Implementation" }
              ]}
              socialLinks={[
                { icon: <Github className="w-5 h-5" />, url: "https://github.com/yourusername" },
                { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/yourusername" },
                { icon: <Mail className="w-5 h-5" />, url: "mailto:your.email@example.com" }
              ]}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
