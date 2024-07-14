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
        };
        completeCell.appendChild(completeCheckbox);

        const deleteCell = newRow.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            table.deleteRow(newRow.rowIndex - 1);
        };
        deleteCell.appendChild(deleteButton);

        sortTable();

        // Clear input fields
        document.getElementById('timeInput').value = '';
        document.getElementById('activityInput').value = '';
    }
}

// Clear all activities function
function clearAll() {
    const table = document.getElementById('activityTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
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