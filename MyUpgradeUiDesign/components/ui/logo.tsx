import { FC } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'icon' | 'full';
}

const Logo: FC<LogoProps> = ({ className = '', variant = 'full' }: LogoProps) => {
  if (variant === 'icon') {
    return (
      <img 
        src="/cryobyteprime-logo.png" 
        alt="CryoBytePrime" 
        className={className}
      />
    );
  }

  return (
    <img 
      src="/cryobyteprime-logo-and-testWord.png" 
      alt="CryoBytePrime" 
      className={className}
    />
  );
};

export default Logo;
