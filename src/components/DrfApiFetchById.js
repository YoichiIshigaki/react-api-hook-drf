import React, { useState } from "react";
import axios from "axios";

const DrfApiFetchById = () => {
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

	return (
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
	);
};

export default DrfApiFetchById;
