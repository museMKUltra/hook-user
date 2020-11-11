import React, { Component } from "react";

class UserPicker extends Component {
	state = {
		users: [],
		isLoading: false,
	};

	componentDidMount() {
		this.setState({ isLoading: true });
		fetch("https://jsonplaceholder.typicode.com/users")
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to fetch...");
				}
				return response.json();
			})
			.then(result => {
				const users = result.slice(0, 5).map(user => ({
					id: user.id,
					name: user.name,
				}));
				this.setState({ users });
				this.setState({ isLoading: false });
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {});
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.isLoading !== this.state.isLoading || nextState.users !== this.state.users) {
			return true;
		}
		return false;
	}

	render() {
		const userList = this.state.users.map(user => {
			return <option key={user.id} value={user.id}>{`${user.id}. ${user.name}`}</option>;
		});
		// console.log("%cclass rendering...", "color: mediumseagreen");
		return (
			<div>
				{this.state.isLoading ? (
					"loading..."
				) : (
					<select name="" id="" onChange={this.props.handlePickedUser}>
						{userList}
					</select>
				)}
			</div>
		);
	}
}

export default UserPicker;
