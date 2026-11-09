import React from 'react';
import { HelpCircle, type LucideProps } from 'lucide-react';
import { iconMap } from './icon-map';

export interface IconRendererProps extends LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<IconRendererProps> = ({ name, ...props }) => {
  const normalizedKey = name.toLowerCase().trim();
  const IconComponent = iconMap[normalizedKey] || HelpCircle;
  return <IconComponent {...props} />;
};
