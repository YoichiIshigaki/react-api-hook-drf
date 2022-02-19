import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetchById = () => {
	const [tasks, setTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState([]);
	const [id, setId] = useState(1);
	const token = "8edb985fa2e003cf8cc7b81a1e392d3e91a32786";

	const getTask = () => {
		axios
			.get(`http://127.0.0.1:8000/api/tasks/${id}`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				setSelectedTask(res.data);
			});
	};

	const deleteTask = (taskId) => {
		axios
			.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				setTasks(tasks.filter((task) => task.id !== taskId));
				setSelectedTask([]);
			});
	};
	useEffect(() => {
		axios
			.get("http://127.0.0.1:8000/api/tasks/", {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				setTasks(res.data);
			});
	}, []);
	return (
		<div>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>
						{task.id} : {task.title}
						<button
							type="button"
							onClick={() => {
								deleteTask(task.id);
							}}
						>
							<span className="fa fa-trash-alt"></span>
						</button>
					</li>
				))}
			</ul>
			<div>
				<p>Set Id</p>
				<input
					type="text"
					value={id}
					onChange={(evt) => setId(evt.target.value)}
				/>
				<button
					type="button"
					onClick={() => {
						getTask();
					}}
				>
					Get Task
				</button>

				<h3>
					{selectedTask.title}:{selectedTask.id}
				</h3>
			</div>
		</div>
	);
};

export default DrfApiFetchById;
