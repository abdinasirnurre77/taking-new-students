// --- 1. STATE MANAGEMENT ---
let students = JSON.parse(localStorage.getItem('sms_data')) || [];

// --- 2. NAVIGATION LOGIC ---
function navigateTo(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');

    if (pageId === 'list') renderTable();
    if (pageId === 'stats') updateStats();
}

// --- 3. STUDENT MANAGEMENT & VALIDATION ---
function handleAddStudent() {
    const nameInput = document.getElementById('stuName').value.trim();
    const ageInput = document.getElementById('stuAge').value;
    const courseInput = document.getElementById('stuCourse').value;
    const msg = document.getElementById('feedbackMsg');

    // A. Hubi in meelaha banaan la buuxiyay
    if (!nameInput || !ageInput || !courseInput) {
        showFeedback("Fadlan buuxi dhamaan meelaha banaan!", "red");
        return;
    }

    // B. MAGACA VALIDATION (Regex)
    // Waxaan u ogolaanaynaa xarfaha kaliya (A-Z, a-z) iyo boosaska.
    // Magacu waa inuu ka bilaabmaa xaraf, dhererkiisuna ugu yaraan yahay 3 xaraf.
    const namePattern = /^[A-Za-z\s]{3,50}$/;

    if (!namePattern.test(nameInput)) {
        showFeedback("Magaca waa inuu xarfo kaliya ahaadaa (ugu yaraan 3 xaraf)!", "red");
        return;
    }

    // C. AGE VALIDATION
    if (ageInput < 5 || ageInput > 100) {
        showFeedback("Fadlan geli da' sax ah (5-100)!", "red");
        return;
    }

    // Create Student Object
    const newStudent = {
        id: Date.now(),
        name: nameInput,
        age: parseInt(ageInput),
        course: courseInput
    };

    // Add to Array & LocalStorage
    students.push(newStudent);
    saveData();

    // Success Feedback
    showFeedback("Ardayga si guul leh ayaa loo daray!", "green");
    resetForm();
}

// Function yar oo fariimaha maamusha
function showFeedback(text, color) {
    const msg = document.getElementById('feedbackMsg');
    msg.style.color = color;
    msg.innerText = text;
}

function resetForm() {
    document.getElementById('stuName').value = "";
    document.getElementById('stuAge').value = "";
    document.getElementById('stuCourse').value = "";
}

// --- 4. DYNAMIC UI UPDATES ---
function renderTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;
    tbody.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td><button onclick="deleteStudent(${student.id})" class="btn-delete">Tir</button></td>
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
    if (!document.getElementById('totalCount')) return;
    document.getElementById('totalCount').innerText = students.length;
    const seniors = students.filter(s => s.age > 20).length;
    document.getElementById('seniorCount').innerText = seniors;
}

function saveData() {
    localStorage.setItem('sms_data', JSON.stringify(students));
}

// Set initial Date on Home
window.onload = () => {
    const dateEl = document.getElementById('currentDate');
    if (dateEl) dateEl.innerText = new Date().toDateString();
};
