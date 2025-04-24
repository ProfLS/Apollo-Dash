// Dark mode toggle
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

toggle.addEventListener('change', () => {
  root.classList.toggle('dark-mode');
});

// Metric highlight on scroll and hover
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

diagram.addEventListener('mouseenter', () => {
  const heartMetric = document.querySelector('[data-target="heart"]');
  metricElements.forEach(m => m.classList.remove('active'));
  heartMetric?.classList.add('active');
});

diagram.addEventListener('mouseleave', () => {
  metricElements.forEach(m => m.classList.remove('active'));
});

diagram.addEventListener('wheel', (event) => {
  event.preventDefault();
  currentMetricIndex += event.deltaY > 0 ? 1 : -1;
  if (currentMetricIndex < 0) currentMetricIndex = metricList.length - 1;
  if (currentMetricIndex >= metricList.length) currentMetricIndex = 0;
  highlightMetric(currentMetricIndex);
});

// Expand metric panel on click
metricElements.forEach(metric => {
  metric.addEventListener('click', () => {
    const metricName = metric.getAttribute('data-metric-name');
    const metricTarget = metric.getAttribute('data-target');
    showMetricInterface(metricName, metricTarget);
  });
});

function showMetricInterface(name, target) {
  const details = document.getElementById('metric-details');
  details.innerHTML = `
    <h2>${name}</h2>
    <div class="metric-form">
      ${getMetricForm(target)}
    </div>
  `;
  if (['calories', 'steps', 'sleep', 'weight'].includes(target)) {
    showHistory(target);
  }
}

function getMetricForm(target) {
  switch (target) {
    case 'calories':
      return `
        <label>Calories burned today:</label>
        <input type="number" id="calories-input" />
        <button onclick="saveMetric('calories')">Save</button>
        <div id="calories-history"></div>
      `;
    case 'steps':
      return `
        <label>Steps walked today:</label>
        <input type="number" id="steps-input" />
        <button onclick="saveMetric('steps')">Save</button>
        <div id="steps-history"></div>
      `;
    case 'sleep':
      return `
        <label>Hours slept:</label>
        <input type="number" id="sleep-input" />
        <button onclick="saveMetric('sleep')">Save</button>
        <div id="sleep-history"></div>
      `;
    case 'weight':
      return `
        <label>Weight:</label>
        <input type="number"id="weight-input" />
        <select id="weight-unit">
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
        <button onclick="saveWeight()">Save</button>
        <div id="weight-history"></div>
      `;
    default:
      return `<p>Detailed interface for "${target}" coming soon.</p>`;
  }
}

function saveMetric(metricKey) {
  const input = document.getElementById(`${metricKey}-input`);
  const value = parseFloat(input.value);
  if (isNaN(value)) return alert('Please enter a valid number.');

  const today = new Date().toISOString().slice(0, 10);
  const existing = JSON.parse(localStorage.getItem(metricKey)) || [];

  existing.push({ date: today, value });
  localStorage.setItem(metricKey, JSON.stringify(existing));
  showHistory(metricKey);
  input.value = '';
}

function showHistory(metricKey) {
  const historyDiv = document.getElementById(`${metricKey}-history`);
  const data = JSON.parse(localStorage.getItem(metricKey)) || [];
  if (!historyDiv) return;
  historyDiv.innerHTML = `
    <h3>History</h3>
    <ul>
      ${data.map(entry => `<li>${entry.date}: ${entry.value}</li>`).join('')}
    </ul>
  `;
}

function saveWeight() {
  const input = document.getElementById('weight-input');
  const unit = document.getElementById('weight-unit').value;
  let value = parseFloat(input.value);
  if (unit === 'lb') value = value * 0.453592; // convert to kg

  const today = new Date().toISOString().slice(0, 10);
  const existing = JSON.parse(localStorage.getItem('weight')) || [];
  existing.push({ date: today, value });
  localStorage.setItem('weight', JSON.stringify(existing));
  showWeightHistory(unit);
}

function showWeightHistory(unit = 'kg') {
  const historyDiv = document.getElementById('weight-history');
  const data = JSON.parse(localStorage.getItem('weight')) || [];
  historyDiv.innerHTML = `
    <h3>History</h3>
    <ul>
      ${data.map(entry => {
        let val = entry.value;
        if (unit === 'lb') val = (val / 0.453592).toFixed(1);
        return `<li>${entry.date}: ${val} ${unit}</li>`;
      }).join('')}
    </ul>
  `;
}

function getTodayKey(metricKey) {
  const today = new Date().toISOString().slice(0, 10);
  return `${metricKey}-${today}`;
}

function saveCalories() {
  const input = document.getElementById('calories-input');
  const value = parseInt(input.value);
  if (isNaN(value)) return alert('Enter a valid number.');

  const key = getTodayKey('calories');
  const total = parseInt(localStorage.getItem(key) || '0');
  const newTotal = total + value;
  localStorage.setItem(key, newTotal);
  showCaloriesHistory();
  input.value = '';
}

function showCaloriesHistory() {
  const key = getTodayKey('calories');
  const total = localStorage.getItem(key) || '0';
  const historyDiv = document.getElementById('calories-history');
  historyDiv.innerHTML = `<p>Total today: ${total} kcal</p>`;
}
