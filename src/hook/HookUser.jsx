import { memo, useEffect, useRef, useState } from "react";

function HookUser(props) {
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log("%cuseEffect", "color: lightsalmon");
		setIsLoading(true);
		fetch("https://jsonplaceholder.typicode.com/users/" + props.pickedUser.id)
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to fetch...");
				}
				return response.json();
			})
			.then(result => {
				setUser({
					id: result.id,
					username: result.username,
				});
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
		return () => {
			console.log("%cuseEffectReturn", "color: lightsalmon");
		};
	}, [props.pickedUser]);

	console.log("%chook rendering...", "color: lightsalmon");
	return <div>{isLoading ? "loading..." : user.username}</div>;
}

export default memo(HookUser);
