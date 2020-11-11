import { createRef, useCallback, useMemo, useRef, useState } from "react";
import HookUserPicker from "./HookUserPicker";
import HookUser from "./HookUser";

function Users(callback, deps) {
	const [pickedUser, setPickedUser] = useState({
		id: 1,
	});
	const [mode, setMode] = useState("light");
	const [isDestroyed, setIsDestroyed] = useState(false);

	const changeIsDestroyed = () => {
		setIsDestroyed(!isDestroyed);
	};

	const switchMode = () => {
		const modes = ["light", "dark"];
		const index = modes.indexOf(mode);
		const next = (index + 1) % modes.length;
		setMode(modes[next]);
	};

	const changePickedUser = useCallback(
		event => {
			setPickedUser({
				...pickedUser,
				id: event.currentTarget.value,
			});
		},
		[pickedUser]
	);

	return (
		<div className={`users users__mode--${mode}`}>
			<button onClick={switchMode}>{mode}</button>
			<input type="checkbox" onChange={changeIsDestroyed} checked={!isDestroyed} />
			<HookUserPicker handlePickedUser={changePickedUser} />
			{isDestroyed || <HookUser pickedUser={pickedUser} />}
		</div>
	);
}

export default Users;
