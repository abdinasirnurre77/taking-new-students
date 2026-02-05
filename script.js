// --- 1. STATE MANAGEMENT (Arrays & LocalStorage) ---
let students = JSON.parse(localStorage.getItem('sms_data')) || [];

// --- 2. NAVIGATION LOGIC ---
function navigateTo(pageId) {
    // DOM Manipulation: Qari dhamaan boggaga, muuji kan la rabto
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');

    // Dynamic Updates markii bogga la badalo
    if (pageId === 'list') renderTable();
    if (pageId === 'stats') updateStats();
}

// --- 3. STUDENT MANAGEMENT (Functions & Conditions) ---
function handleAddStudent() {
    const name = document.getElementById('stuName').value;
    const age = document.getElementById('stuAge').value;
    const course = document.getElementById('stuCourse').value;
    const msg = document.getElementById('feedbackMsg');

    // Input Validation
    if (!name || !age || !course) {
        msg.style.color = "red";
        msg.innerText = "Fadlan buuxi dhamaan meelaha banaan!";
        return;
    }

    // Create Student Object
    const newStudent = {
        id: Date.now(),
        name: name,
        age: parseInt(age),
        course: course
    };

    // Add to Array & LocalStorage
    students.push(newStudent);
    saveData();

    // Feedback & Reset
    msg.style.color = "green";
    msg.innerText = "Ardayga si guul leh ayaa loo daray!";
    document.getElementById('stuName').value = "";
    document.getElementById('stuAge').value = "";
    document.getElementById('stuCourse').value = "";
}

// --- 4. DYNAMIC UI UPDATES ---
function renderTable() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = ""; // Clear current table

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td><button onclick="deleteStudent(${student.id})" style="background:#ef4444; padding:5px 10px; width:auto;">Tir</button></td>
        `;
        tbody.appendChild(row);
    });
}

function deleteStudent(id) {
    if (confirm("Ma hubtaa inaad tirtirto ardaygan?")) {
        students = students.filter(s => s.id !== id);
        saveData();
        renderTable();
    }
}

function updateStats() {
    document.getElementById('totalCount').innerText = students.length;
    const seniors = students.filter(s => s.age > 20).length;
    document.getElementById('seniorCount').innerText = seniors;
}

function saveData() {
    localStorage.setItem('sms_data', JSON.stringify(students));
}

// Set initial Date on Home
document.getElementById('currentDate').innerText = new Date().toDateString();