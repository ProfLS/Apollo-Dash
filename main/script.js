// Dark mode
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

toggle.addEventListener('change', () => {
root.classList.toggle('dark-mode');
});
const diagram = document.querySelector('[data-metric-zone]');
const metricElements = document.querySelectorAll('.metric');
const metricList = Array.from(metricElements);
let currentMetricIndex = 0;

function highlightMetric(index) {
  metricElements.forEach(m => m.classList.remove('active'));
  if (metricList[index]) {
    metricList[index].classList.add('active');
  }
}

// Highlight butoons on hover
diagram.addEventListener('mouseenter', () => {
  const heartMetric = document.querySelector('[data-target="heart"]');
  metricElements.forEach(m => m.classList.remove('active'));
  heartMetric?.classList.add('active');
});

diagram.addEventListener('mouseleave', () => {
  metricElements.forEach(m => m.classList.remove('active'));
});

// Scroll through buttons with wheel
diagram.addEventListener('wheel', (event) => {
  event.preventDefault();
  currentMetricIndex += event.deltaY > 0 ? 1 : -1;
  if (currentMetricIndex < 0) currentMetricIndex = metricList.length - 1;
  if (currentMetricIndex >= metricList.length) currentMetricIndex = 0;
  highlightMetric(currentMetricIndex);
});