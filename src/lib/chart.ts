// Chart.js draws on a canvas, so it can't inherit the page font from CSS.
export function chartFontFamily() {
  if (typeof window === 'undefined') return undefined;
  return getComputedStyle(document.body).fontFamily;
}

export const chartTooltip = {
  backgroundColor: '#0F1E3D',
  titleColor: '#FFFFFF',
  bodyColor: '#DCE6FA',
  padding: 12,
  cornerRadius: 10,
  boxPadding: 4,
  displayColors: true,
  usePointStyle: true,
};
