// Predefined gradient color sets for animations
export const gradientPresets = {
  // The gradients from your specification
  blue_purple: [
    ['#9A99FF', '#fdf7ff', '#597CE9'],
    ['#f7c2ff', '#fd7fff', '#bcafe9'],
    ['#6699ff', '#fdf7ff', '#8ed799'],
    ['#6699ff', '#fdf7ff', '#8ed7e9']
  ],
  
  // Additional preset options for variety
  purple_pink: [
    ['#9A99FF', '#f7c2ff', '#fd7fff'],
    ['#6065D9', '#C896FF', '#F2A6FF'],
    ['#7F9CF5', '#D387FF', '#F0ABFF'],
    ['#5F72E4', '#E8A9FF', '#FFC4FF']
  ],

  blue_cyan: [
    ['#6699ff', '#8ed7e9', '#B4FFFF'],
    ['#5F72E4', '#79E2F2', '#A0FFFF'],
    ['#7F9CF5', '#97E9F5', '#C2FFFF'],
    ['#6065D9', '#88DEF0', '#AEFFFF']
  ]
};

// Helper function to mix two colors for transitions
export function mixColors(color1: string, color2: string, factor: number): string {
  // Convert hex to rgb
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  
  if (!c1 || !c2) return color1;
  
  // Mix the colors
  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));
  
  // Convert back to hex
  return rgbToHex(r, g, b);
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  
  return { r, g, b };
}

// Helper function to convert rgb to hex
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
} 