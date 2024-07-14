// Load activities from localStorage
function loadActivities() {
    const savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
    
    savedActivities.forEach(activity => {
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = activity.time;
        const activityCell = newRow.insertCell(1);
        activityCell.textContent = activity.text;
        if (activity.completed) {
            activityCell.classList.add('completed');
        }
        
        const completeCell = newRow.insertCell(2);
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.checked = activity.completed;
        completeCheckbox.onchange = function() {
            activityCell.classList.toggle('completed', this.checked);
            saveActivities();
        };
        completeCell.appendChild(completeCheckbox);

        const deleteCell = newRow.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            table.deleteRow(newRow.rowIndex - 1);
            saveActivities();
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Save activities to localStorage
function saveActivities() {
    const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
    const activities = [];
    
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        activities.push({
            time: row.cells[0].textContent,
            text: row.cells[1].textContent,
            completed: row.cells[2].getElementsByTagName('input')[0].checked
        });
    }
    
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Add activity function
function addActivity() {
    const time = document.getElementById('timeInput').value;
    const activity = document.getElementById('activityInput').value;
    if (time && activity) {
        const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = time;
        const activityCell = newRow.insertCell(1);
        activityCell.textContent = activity;
        
        const completeCell = newRow.insertCell(2);
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.onchange = function() {
            activityCell.classList.toggle('completed', this.checked);
            saveActivities();
        };
        completeCell.appendChild(completeCheckbox);

        const deleteCell = newRow.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            table.deleteRow(newRow.rowIndex - 1);
            saveActivities();
        };
        deleteCell.appendChild(deleteButton);

        sortTable();
        saveActivities();

        // Clear input fields
        document.getElementById('timeInput').value = '';
        document.getElementById('activityInput').value = '';
    }
}

// Clear all activities function
function clearAll() {
    const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    saveActivities();
}

// Sort table function
function sortTable() {
    const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(table.rows);
    rows.sort((a, b) => {
        const timeA = convertTo24Hour(a.cells[0].textContent);
        const timeB = convertTo24Hour(b.cells[0].textContent);
        return timeA.localeCompare(timeB);
    });
    rows.forEach(row => table.appendChild(row));
}

// Helper function to convert 12-hour time to 24-hour for sorting
function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours.padStart(2, '0')}:${minutes}`;
}

// Function to update clock and calendar
function updateClockAndCalendar() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    
    const timeString = `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('clock').textContent = timeString;
    document.getElementById('ampm').textContent = ampm;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    document.getElementById('day').textContent = day;
    document.getElementById('date').textContent = `${month} ${date}, ${year}`;
}

// Update clock and calendar every second
setInterval(updateClockAndCalendar, 1000);

// Initialize the app
function initApp() {
    loadActivities();
    updateClockAndCalendar();
}

// Call initApp when the page loads
window.onload = initApp;