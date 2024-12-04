export interface BasicInfoProps {
    errors: { [key: string]: string };
    onChange: (name: string, value: string) => void;
  }