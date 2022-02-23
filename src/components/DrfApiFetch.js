import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetchById = () => {
	const [tasks, setTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState([]);
	const [editedTask, setEditedTask] = useState({ id: "", title: "" });
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
			.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				setTasks(tasks.filter((task) => task.id !== taskId));
				setSelectedTask([]);
				if (taskId === editedTask.id) {
					setEditedTask({ id: "", title: "" });
				}
			});
	};
	const createTask = (task) => {
		const data = {
			title: task.title,
		};
		axios
			.post(`http://127.0.0.1:8000/api/tasks/`, data, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				setTasks([...tasks, res.data]);
				setEditedTask({ id: "", title: "" });
			});
	};

	const editTask = (task) => {
		axios
			.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				setTasks(
					tasks.map((task) => (task.id === editedTask.id ? res.data : task))
				);
				setSelectedTask({ id: "", title: "" });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleInputChange = () => (evt) => {
		const value = evt.target.value;
		const name = evt.target.name;
		setEditedTask({ ...editedTask, [name]: value });
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
						<button
							type="button"
							onClick={() => {
								setEditedTask(task);
							}}
						>
							<span className="fa fa-pen"></span>
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
			<div>
				<input
					type="text"
					name="title"
					value={editedTask.title}
					onChange={handleInputChange()}
					placeholder="new Task"
					required
				/>
				{editedTask.id ? (
					<button onClick={() => editTask(editedTask)}>Update</button>
				) : (
					<button onClick={() => createTask(editedTask)}>Create</button>
				)}
			</div>
		</div>
	);
};

export default DrfApiFetchById;
