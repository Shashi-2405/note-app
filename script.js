// Reference UI elements
const noteInput = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const exportBtn = document.getElementById('exportBtn');
const notesList = document.getElementById('notesList');

// Load saved notes from localStorage
const loadNotes = () => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;
    notesList.appendChild(li);
  });
};

// Save notes to localStorage
const saveNote = () => {
  const note = noteInput.value;
  if (note.trim()) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    loadNotes();
  }
};

// Export the current note as a .txt file
const exportNote = () => {
  const note = noteInput.value;
  if (note.trim()) {
    const blob = new Blob([note], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Attach event listeners
saveBtn.addEventListener('click', saveNote);
exportBtn.addEventListener('click', exportNote);

// Initialize the app
loadNotes();
