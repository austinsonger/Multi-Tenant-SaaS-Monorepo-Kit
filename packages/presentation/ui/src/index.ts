// @monorepo/ui
export const packageName = "@monorepo/ui";

// Export UI components
export interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const version = '0.1.0';

// You would typically export actual UI components here
