/* --- IMPORTS --- */
const db = require("../database/db");

/* --- METHODS --- */
const tasks = db.prepare(/* sql */ `
	SELECT *
	FROM tasks
`).all();

const insert_task = db.prepare(/* sql */ `
	INSERT INTO tasks (content, complete)
  VALUES ($content, $complete)
  RETURNING id, content, created_at
`);

const select_tasks = db.prepare(/* sql */ `
  SELECT
		id,
		content,
		TIME(created_at) AS created_at,
		complete
	FROM tasks
`);

const delete_task = db.prepare(/* sql */ `
	DELETE FROM tasks
	WHERE id = ?
`);

/* --- FUNCTIONS --- */
function createTask(task) {
	return insert_task.get(task);
}

function listTasks() {
  return select_tasks.all();
}

function removeTask(id){
	delete_task.run(id);
}

/* --- EXPORT, FELICIA --- */
module.exports = { createTask, listTasks, removeTask };