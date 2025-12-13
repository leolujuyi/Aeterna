import React from 'react';

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: number;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan?: string;
}