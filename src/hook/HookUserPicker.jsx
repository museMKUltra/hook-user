import { memo, useEffect, useState } from "react";

function HookUserPicker(props) {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch("https://jsonplaceholder.typicode.com/users")
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to fetch...");
				}
				return response.json();
			})
			.then(result => {
				setUsers(
					result.slice(0, 5).map(user => ({
						id: user.id,
						name: user.name,
					}))
				);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const userList = users.map(user => {
		return <option key={user.id} value={user.id}>{`${user.id}. ${user.name}`}</option>;
	});

	// console.log("%chook rendering...", "color: indianred");
	return (
		<div>
			{isLoading ? (
				"loading..."
			) : (
				<select name="" id="" onChange={props.handlePickedUser}>
					{userList}
				</select>
			)}
		</div>
	);
}

export default HookUserPicker;
