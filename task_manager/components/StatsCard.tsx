import React from 'react';
import '@/style/stylesheet.css';

interface StatsCardProps {
  label: string;
  value: number;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, color }) => (
  <div className="stat-card">
    <div className="stat-number" style={{ color }}>{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);