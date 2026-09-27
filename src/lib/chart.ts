// Chart.js draws on a canvas, so it can't inherit the page font from CSS.
export function chartFontFamily() {
  if (typeof window === 'undefined') return undefined;
  return getComputedStyle(document.body).fontFamily;
}

export const chartTooltip = {
  backgroundColor: '#0E1433',
  titleColor: '#FFFFFF',
  bodyColor: '#DFE4FF',
  padding: 12,
  cornerRadius: 12,
  boxPadding: 4,
  displayColors: true,
  usePointStyle: true,
};
