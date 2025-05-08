// MOTIVATIONAL MANTRA FEATURE
const mantraBox = document.createElement('div');
mantraBox.id = 'mantra-box';
mantraBox.style.display = 'flex';
mantraBox.style.justifyContent = 'center';
mantraBox.style.alignItems = 'center';
mantraBox.style.marginTop = '20px';

const mantraDisplay = document.createElement('div');
mantraDisplay.id = 'mantra-display';
mantraDisplay.style.fontFamily = 'Georgia, serif';
mantraDisplay.style.fontWeight = 'bold';
mantraDisplay.style.fontSize = '1.5rem';
mantraDisplay.style.textAlign = 'center';
mantraDisplay.style.color = '#8a1e47';
mantraDisplay.style.padding = '10px';

const controls = document.createElement('div');
controls.style.display = 'flex';
controls.style.gap = '10px';
controls.style.marginLeft = '10px';

const editBtn = document.createElement('button');
editBtn.textContent = '✎';
editBtn.title = 'Edit mantra';
editBtn.style.fontSize = '1rem';
editBtn.style.cursor = 'pointer';
editBtn.style.border = 'none';
editBtn.style.background = 'transparent';

const saveBtn = document.createElement('button');
saveBtn.textContent = '💾';
saveBtn.title = 'Save mantra';
saveBtn.style.fontSize = '1rem';
saveBtn.style.cursor = 'pointer';
saveBtn.style.border = 'none';
saveBtn.style.background = 'transparent';
saveBtn.style.display = 'none';

const mantraInput = document.createElement('input');
mantraInput.type = 'text';
mantraInput.placeholder = 'Enter your motivational mantra...';
mantraInput.style.padding = '10px';
mantraInput.style.borderRadius = '8px';
mantraInput.style.border = '1px solid #ccc';
mantraInput.style.fontSize = '1rem';
mantraInput.style.width = '60%';
mantraInput.style.display = 'none';

editBtn.onclick = () => {
  mantraInput.value = localStorage.getItem('motivationalMantra') || '';
  mantraInput.style.display = 'inline-block';
  saveBtn.style.display = 'inline-block';
  mantraDisplay.style.display = 'none';
  editBtn.style.display = 'none';
};

saveBtn.onclick = () => {
  const text = mantraInput.value.trim();
  if (text) {
    localStorage.setItem('motivationalMantra', text);
    displayMantra();
  }
};

controls.appendChild(editBtn);
controls.appendChild(saveBtn);

mantraBox.appendChild(mantraDisplay);
mantraBox.appendChild(mantraInput);
mantraBox.appendChild(controls);
document.body.insertBefore(mantraBox, document.querySelector('main'));

displayMantra = function() {
  const saved = localStorage.getItem('motivationalMantra');
  if (saved) {
    mantraDisplay.textContent = saved;
    mantraDisplay.style.display = 'block';
    mantraDisplay.style.fontSize = '2.2rem';
    mantraDisplay.style.textAlign = 'center';
    mantraDisplay.style.fontFamily = 'Impact, Georgia, serif';
    mantraInput.style.display = 'none';
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
  } else {
    mantraDisplay.textContent = '';
    editBtn.style.display = 'none';
    mantraInput.style.display = 'inline-block';
    saveBtn.style.display = 'inline-block';
  }
};


displayMantra();

//Login
document.getElementById('login-btn').addEventListener('click', function() {
  // Show the modal and the backdrop
  const modal = document.getElementById('login-modal');
  const backdrop = document.getElementById('backdrop');
  
  modal.style.display = 'block';
  backdrop.style.display = 'block';

  // Position the modal above the button
  const buttonPosition = this.getBoundingClientRect();
  modal.style.top = `${buttonPosition.top + window.scrollY + this.offsetHeight + 10}px`;
});

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('login-modal').style.display = 'none';
  document.getElementById('backdrop').style.display = 'none'; // Hide backdrop
});

document.getElementById('submit-login').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
      alert('Login successful');
      document.getElementById('login-modal').style.display = 'none';
      document.getElementById('backdrop').style.display = 'none'; // Hide backdrop
  } else {
      alert('Please fill in both fields');
  }
});


// Dark mode toggle
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

toggle.addEventListener('change', () => {
  root.classList.toggle('dark-mode');
});

const diagram = document.querySelector('[data-metric-zone]');
const metricElements = document.querySelectorAll('.metric');
const metricList = Array.from(metricElements);
let currentMetricIndex = 0;
let activeMetricTarget = null;

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

metricElements.forEach(metric => {
  metric.addEventListener('click', (event) => {
    // Prevent clicks inside inputs/buttons from closing the metric
    if (event.target.closest('input') || event.target.closest('textarea') || event.target.closest('button') || event.target.tagName === 'SELECT') {
      event.stopPropagation();
      return;
    }
    const metricName = metric.getAttribute('data-metric-name');
    const metricTarget = metric.getAttribute('data-target');

    if (activeMetricTarget === metricTarget) {
      closeActiveMetric();
      return;
    }

    activeMetricTarget = metricTarget;

    metricElements.forEach(el => {
      if (el.getAttribute('data-target') !== metricTarget) {
        el.style.padding = '5px';
        el.style.fontSize = '0.85rem';
        el.innerHTML = el.getAttribute('data-metric-name');
      } else {
        el.style.padding = '15px';
        el.style.fontSize = '1rem';
        el.innerHTML = `<strong>${metricName}</strong><div class="metric-form">${getMetricForm(metricTarget)}</div>`;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    

    if (["calories", "steps", "sleep", "weight"].includes(metricTarget)) {
      showHistory(metricTarget);
    }
    if (metricTarget === 'sleep') showBedtimeDisplay();
    if (metricTarget === 'planner') showPlanner(new Date().toISOString().slice(0, 10));
    if (metricTarget === 'reminders') showReminders();
    if (metricTarget === 'prescriptions') showPrescriptions();
    if (metricTarget === 'appointments') showAppointments();

    // Clear bottom panel
    const details = document.getElementById('metric-details');
    details.innerHTML = `<h2>Select a metric</h2><p>Hover or click on a metric to see details.</p>`;
  });
});

function closeActiveMetric() {
  activeMetricTarget = null;
  metricElements.forEach(el => {
    el.style.padding = '';
    el.style.fontSize = '';
    el.innerHTML = el.getAttribute('data-metric-name');
  });

  const details = document.getElementById('metric-details');
  details.innerHTML = `<h2>Select a metric</h2><p>Hover or click on a metric to see details.</p>`;
}

function showMetricInterface(name, target) {
  const details = document.getElementById('metric-details');
  details.innerHTML = `
    <h2>${name}</h2>
    <div class="metric-form">
      ${getMetricForm(target)}
    </div>
  `;

  if (["calories", "steps", "sleep", "weight"].includes(target)) {
    showHistory(target);
  }

  if (target === 'sleep') {
    showBedtimeDisplay();
  }

  if (target === 'planner') {
    showPlanner(new Date().toISOString().slice(0, 10));
  }

  if (target === 'reminders') {
    showReminders();
  }

  if (target === 'prescriptions') {
    showPrescriptions();
  }

  if (target === 'appointments') {
    showAppointments();
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

          <hr />
          <h3>Set Bedtime</h3>
          <label>Bedtime (24h format):</label>
          <input type="time" id="bedtime-input" />
          <button onclick="setBedtime()">Set Bedtime</button>
          <div id="bedtime-display"></div>
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
      case 'Planner':
      return `
        <label>Task Description:</label>
        <input type="text" id="planner-task" />
        <label>Date:</label>
        <input type="date" id="planner-date" />
        <label>Time:</label>
        <input type="time" id="planner-time" />
        <button onclick="savePlannerTask()">Schedule</button>
        <div id="planner-list"></div>
      `;
    case 'reminders': 
      return `
      <label>Reminder:</label>
      <input type="text" id="reminder-text" />
      <label>Time:</label>
      <input type="time" id="reminder-time" />
      <button onclick="addReminder()">Set Reminder</button>
      <div id="reminder-list"></div>
      `;
    case 'prescriptions':
      return `
      <label>Prescription Name:</label>
      <input type="text" id="rx-name" />
      <label>Dosage:</label>
      <input type="text" id="rx-dosage" />
      <label>Frequency/Instructions:</label>
      <input type="text" id="rx-notes" />
      <label>Refill Reminder Date:</label>
      <input type="date" id="rx-refill-date" />
      <label>Pharmacy Location (Google Maps name):</label>
      <input type="text" id="rx-pharmacy" />
      <button onclick="savePrescription()">Save Prescription</button>
      <div id="rx-list"></div>
      `;
    case 'appointments':
      return `
        <label>Appointment Title:</label>
        <input type="text" id="appt-title" />
        <label>Date:</label>
        <input type="date" id="appt-date" />
        <label>Time:</label>
        <input type="time" id="appt-time" />
        <label>Location (Google Maps name):</label>
        <input type="text" id="appt-location" />
        <button onclick="saveAppointment()">Save Appointment</button>
        <div id="appt-list"></div>
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

function setBedtime() {
  const input = document.getElementById('bedtime-input');
  const bedtime = input.value;

  if (!bedtime) {
    alert("Please select a time.");
    return;
  }

  localStorage.setItem('bedtime', bedtime);
  setBedtimeReminder(bedtime);
  showBedtimeDisplay(bedtime);
}

function setBedtimeReminder(bedtime) {
  const [hourStr, minStr] = bedtime.split(':');
  let hour = parseInt(hourStr);
  let minute = parseInt(minStr);

  // Subtract 30 minutes
  minute -= 30;
  if (minute < 0) {
    minute += 60;
    hour -= 1;
    if (hour < 0) hour = 23;
  }

  const reminderTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const reminder = { time: reminderTime, message: "Bedtime in 30 minutes" };

  // Store to reminders
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.push(reminder);
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

function showBedtimeDisplay(bedtime = null) {
  const div = document.getElementById('bedtime-display');
  if (!bedtime) bedtime = localStorage.getItem('bedtime');
  if (bedtime) {
    div.innerHTML = `<p>Your bedtime is set to <strong>${bedtime}</strong>.</p>`;
  } else {
    div.innerHTML = '';
  }
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

function savePlannerTask() {
  const task = document.getElementById('planner-task').value;
  const date = document.getElementById('planner-date').value;
  const time = document.getElementById('planner-time').value;
  if (!task || !date || !time) return alert("Please fill all fields.");

  const key = `planner-${date}`;
  const entry = { time, task };
  const data = JSON.parse(localStorage.getItem(key)) || [];
  data.push(entry);
  localStorage.setItem(key, JSON.stringify(data));

  // Sync to reminders
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.push({ date, time, message: task });
  localStorage.setItem('reminders', JSON.stringify(reminders));

  showPlanner(date);
}

function showPlanner(date) {
  const key = `planner-${date}`;
  const data = JSON.parse(localStorage.getItem(key)) || [];
  const div = document.getElementById('planner-list');
  div.innerHTML = data.map(e => `<p>${e.time} — ${e.task}</p>`).join('');
}

function addReminder() {
  const msg = document.getElementById('reminder-text').value;
  const time = document.getElementById('reminder-time').value;
  if (!msg || !time) return;

  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.push({ time, message: msg });
  localStorage.setItem('reminders', JSON.stringify(reminders));
  showReminders();
}

function showReminders() {
  const list = JSON.parse(localStorage.getItem('reminders')) || [];
  const div = document.getElementById('reminder-list');
  div.innerHTML = list.map(r => `<p>${r.time} — ${r.message}</p>`).join('');
}

setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0,5); 
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.forEach(r => {
    if (r.time === currentTime) alert(`Reminder: ${r.message}`);
  });
}, 60000);

function savePrescription() {
  const name = document.getElementById('rx-name').value;
  const dosage = document.getElementById('rx-dosage').value;
  const notes = document.getElementById('rx-notes').value;
  const refillDate = document.getElementById('rx-refill-date').value;
  const pharmacy = document.getElementById('rx-pharmacy').value;
  if (!name || !dosage) return alert("Name and dosage required.");

  const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
  const entry = { name, dosage, notes, refillDate, pharmacy };
  prescriptions.push(entry);
  localStorage.setItem('prescriptions', JSON.stringify(prescriptions));

  if (refillDate) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push({ date: refillDate, time: "09:00", message: `Refill prescription: ${name}` });
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }

  showPrescriptions();
}

function showPrescriptions() {
  const list = JSON.parse(localStorage.getItem('prescriptions')) || [];
  const div = document.getElementById('rx-list');
  div.innerHTML = '<h3>Saved Prescriptions</h3>' + list.map(rx => `
    <div>
      <p><strong>${rx.name}</strong> — ${rx.dosage}</p>
      <p>${rx.notes}</p>
      <p>Refill on: ${rx.refillDate || 'N/A'}</p>
      <p>Pharmacy: ${rx.pharmacy ? `<a href="https://www.google.com/maps/search/${encodeURIComponent(rx.pharmacy)}" target="_blank">${rx.pharmacy}</a>` : 'N/A'}</p>
      <hr />
    </div>
  `).join('');
}

function saveAppointment() {
  const title = document.getElementById('appt-title').value;
  const date = document.getElementById('appt-date').value;
  const time = document.getElementById('appt-time').value;
  const location = document.getElementById('appt-location').value;

  if (!title || !date || !time) return alert("Please fill in title, date, and time.");

  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const entry = { title, date, time, location };
  appointments.push(entry);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.push({ date, time, message: `Appointment: ${title}` });
  localStorage.setItem('reminders', JSON.stringify(reminders));

  showAppointments();
}

function showAppointments() {
  const list = JSON.parse(localStorage.getItem('appointments')) || [];
  const div = document.getElementById('appt-list');
  div.innerHTML = '<h3>Upcoming Appointments</h3>' + list.map(appt => `
    <div>
      <p><strong>${appt.title}</strong></p>
      <p>${appt.date} at ${appt.time}</p>
      <p>Location: ${appt.location ? `<a href="https://www.google.com/maps/search/${encodeURIComponent(appt.location)}" target="_blank">${appt.location}</a>` : 'N/A'}</p>
      <hr />
    </div>
  `).join('');
}