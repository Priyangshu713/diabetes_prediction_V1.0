import React from 'react';
import { Container } from './ui/Container';
import { Card } from './ui/Card';
import { Github, Linkedin, Mail, Code, Palette, Brain, Database } from 'lucide-react';
import TeamMemberCard from './about/TeamMemberCard';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Our Mission
          </h1>
          
          <Card className="p-8 mb-12">
            <p className="text-gray-300 leading-relaxed mb-6">
              Diabetes is a growing global health concern that affects millions of lives. Early detection and prevention are crucial in managing this condition effectively. Our mission is to leverage cutting-edge technology and machine learning to provide accessible, accurate diabetes risk assessment tools to everyone.
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              We believe that by combining medical knowledge with advanced algorithms, we can help identify potential diabetes risks early, enabling timely intervention and better health outcomes. Our platform is designed to be user-friendly while maintaining clinical relevance, making healthcare more proactive and accessible.
            </p>
          </Card>

          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamMemberCard
              name="Priyangshu Dutta"
              role="Backend Developer & ML Engineer"
              avatarUrl="../dist/assets/priyangshu.jpg?auto=format&fit=crop&q=80&w=200&h=200"

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
              avatarUrl="../dist/assets/Tarak.png?auto=format&fit=crop&q=80&w=200&h=200"

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
