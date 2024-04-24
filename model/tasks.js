/* --- IMPORTS --- */
const db = require("../database/db");

/* --- METHODS --- */
const tasks = db.prepare(/*sql*/`
	SELECT *
	FROM tasks
`).all();

const insert_task = db.prepare(/*sql*/`
	INSERT INTO tasks (content, complete)
  VALUES ($content, $complete)
  RETURNING id, content, created_at
`);

const select_tasks = db.prepare(/*sql*/ `
  SELECT id, content, created_at, complete
	FROM tasks
`);

/* --- FUNCTIONS --- */
function createTask(task) {
	return insert_task.get(task);
}

function listTasks() {
  return select_tasks.all();
}

/* --- TESTS --- */
console.groupCollapsed("*** tasks.js ***");
	console.log(listTasks());
	console.log(`Creating Task`);
	createTask({ content: "stuff", complete: 1 })
	console.log(listTasks());
	// console.log(``);
	// console.log(listTasks());
console.groupEnd();

/* --- EXPORT, FELICIA --- */
module.exports = { createTask, listTasks };