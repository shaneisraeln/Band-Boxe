// Security utilities for the application

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50 && /^[a-zA-Z\s\.]+$/.test(name);
};

export const generateSecureId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const rateLimiter = (() => {
  const attempts: { [key: string]: number[] } = {};
  
  return {
    isAllowed: (key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      if (!attempts[key]) {
        attempts[key] = [];
      }
      
      // Remove old attempts outside the window
      attempts[key] = attempts[key].filter(time => time > windowStart);
      
      if (attempts[key].length >= maxAttempts) {
        return false;
      }
      
      attempts[key].push(now);
      return true;
    },
    
    reset: (key: string): void => {
      delete attempts[key];
    }
  };
})();

export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://esm.sh; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};