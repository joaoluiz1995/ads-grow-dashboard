
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40, showText = true }) => {
  // O link fornecido contém a logo completa (Ícone + Texto)
  // Se showText for falso, poderíamos tentar dar crop via CSS, 
  // mas por enquanto seguiremos a instrução de usar a imagem diretamente.
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src="https://adsgrow.com.br/wp-content/uploads/2025/11/logo-ads.svg" 
        alt="ADS GROWTH Logo"
        style={{ height: `${size}px`, width: 'auto' }}
        className="block drop-shadow-[0_0_12px_rgba(29,144,255,0.3)]"
      />
    </div>
  );
};

export default Logo;
