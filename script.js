
// Attendance data array
let attendanceRecords = [];
let editIndex = null;

// Helper: Render table
function renderTable() {
    const tbody = document.getElementById('attendance-data');
    tbody.innerHTML = '';
    attendanceRecords.forEach((rec, idx) => {
        const tr = document.createElement('tr');
        tr.style.opacity = 0;
        tr.innerHTML = `
            <td>${rec.studentId}</td>
            <td>${rec.studentName}</td>
            <td>${rec.className}</td>
            <td>${rec.date}</td>
            <td>${rec.status}</td>
            <td>
                <button class="btn btn-success btn-sm edit-btn" data-idx="${idx}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
        setTimeout(() => { tr.style.transition = "opacity 0.7s"; tr.style.opacity = 1; }, 50);
    });
    updateStats();
}

// Handle form submit
document.getElementById('attendance-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const studentName = document.getElementById('student-name').value;
    const studentId = document.getElementById('student-id').value;
    const className = document.getElementById('class').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    attendanceRecords.push({ studentName, studentId, className, date, status });
    renderTable();
    this.reset();
});

// Handle delete/edit buttons
document.getElementById('attendance-data').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const idx = e.target.getAttribute('data-idx');
        attendanceRecords.splice(idx, 1);
        renderTable();
    }
    if (e.target.classList.contains('edit-btn')) {
        editIndex = e.target.getAttribute('data-idx');
        const rec = attendanceRecords[editIndex];
        document.getElementById('edit-student-name').value = rec.studentName;
        document.getElementById('edit-student-id').value = rec.studentId;
        document.getElementById('edit-class').value = rec.className;
        document.getElementById('edit-date').value = rec.date;
        document.getElementById('edit-status').value = rec.status;
        document.getElementById('edit-modal').style.display = 'block';
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Fade-in animation for main content
document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = 0;
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.8s';
            mainContent.style.opacity = 1;
        }, 200);
    }
});
