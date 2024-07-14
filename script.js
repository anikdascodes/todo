// Populate time options
const timeSelect = document.getElementById('timeSelect');
for (let i = 0; i < 24; i++) {
    const hour = i + 6;
    const ampm = hour >= 12 && hour < 24 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const time = `${hour12}:00 ${ampm}`;
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
}

// Add activity function
function addActivity() {
    const time = timeSelect.value;
    const activity = document.getElementById('activityInput').value;
    if (time && activity) {
        const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = time;
        newRow.cells[0].setAttribute('data-label', 'Time');
        const activityCell = newRow.insertCell(1);
        activityCell.textContent = activity;
        activityCell.setAttribute('data-label', 'Activity');
        
        const completeCell = newRow.insertCell(2);
        completeCell.setAttribute('data-label', 'Complete');
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.onchange = function() {
            activityCell.classList.toggle('completed', this.checked);
        };
        completeCell.appendChild(completeCheckbox);

        const deleteCell = newRow.insertCell(3);
        deleteCell.setAttribute('data-label', 'Action');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            table.deleteRow(newRow.rowIndex - 1);
        };
        deleteCell.appendChild(deleteButton);

        sortTable();

        // Clear input fields
        timeSelect.value = '';
        document.getElementById('activityInput').value = '';
    }
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

// Reset app function
function resetApp() {
    const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    timeSelect.value = '';
    document.getElementById('activityInput').value = '';
}