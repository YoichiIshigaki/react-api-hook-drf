import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetchById = () => {
	const [tasks, setTasks] = useState([]);
	const token = "8edb985fa2e003cf8cc7b81a1e392d3e91a32786";
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
					</li>
				))}
			</ul>
		</div>
	);
};

export default DrfApiFetchById;
