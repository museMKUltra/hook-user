import React, { Component } from "react";
import UserPicker from "./UserPicker";
import User from "./User";

class Users extends Component {
	state = {
		pickedUser: {
			id: 1,
		},
		mode: "light",
		isDestroyed: false,
	};

	changeIsDestroyed = () => {
		const isDestroyed = !this.state.isDestroyed;
		this.setState({ isDestroyed });
	};

	switchMode = () => {
		const modes = ["light", "dark"];
		const index = modes.indexOf(this.state.mode);
		const next = (index + 1) % modes.length;
		const mode = modes[next];
		this.setState({ mode });
	};

	setPickedUser = event => {
		const pickedUser = {
			id: event.currentTarget.value,
		};
		this.setState({ pickedUser });
	};

	render() {
		return (
			<div className={`users users__mode--${this.state.mode}`}>
				<button onClick={this.switchMode}>{this.state.mode}</button>
				<input type="checkbox" onChange={this.changeIsDestroyed} checked={!this.state.isDestroyed} />
				<UserPicker handlePickedUser={this.setPickedUser} />
				{this.state.isDestroyed || <User pickedUser={this.state.pickedUser} />}
			</div>
		);
	}
}

export default Users;
