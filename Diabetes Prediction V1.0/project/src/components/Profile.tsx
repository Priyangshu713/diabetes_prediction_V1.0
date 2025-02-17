import React from 'react';
import { Container } from './ui/Container';
import ProfileHeader from './profile/ProfileHeader';
import ProfileInputs from './profile/ProfileInputs';
import HealthMetrics from './profile/HealthMetrics';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="space-y-6">
          <ProfileHeader />
          <ProfileInputs />
          <HealthMetrics />
        </div>
      </Container>
    </div>
  );
}