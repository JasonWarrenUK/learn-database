/* --- IMPORTS --- */
const db = require("../database/db");

/* --- METHODS --- */
const insert_task = db.prepare(`
	INSERT INTO tasks (content)
	VALUES (?)
	RETURNING id, content, created_at
`);

/* --- FUNCTIONS --- */
function createTask(content) {
	return insert_task.get(content);
}

/* --- TESTS --- */
const tasks = db.prepare("SELECT * FROM tasks").all();
console.groupCollapsed("*** tasks.js ***");
console.log(tasks);
const testTask = createTask("Eat a banana");
console.log(testTask);
console.log(tasks);
console.groupEnd();

/* --- EXPORT, FELICIA --- */
module.exports = { createTask };