import React, { Component } from "react";

const colorStyle = "color: yellowgreen";
class User extends Component {
	state = {
		user: {},
		isLoading: false,
	};

	timer = null;
	time = 0;

	fetchData() {
		this.setState({ isLoading: true });
		fetch("https://jsonplaceholder.typicode.com/users/" + this.props.pickedUser.id)
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to fetch...");
				}
				return response.json();
			})
			.then(result => {
				const user = {
					id: result.id,
					username: result.username,
				};
				this.setState({ user });
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	async componentDidMount() {
		console.log("%ccomponentDidMount", colorStyle);
		console.log("start counting");
		this.timer = setInterval(() => {
			this.time++;
		}, 1000);
		await this.fetchData();
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevProps.pickedUser.id !== this.props.pickedUser.id) {
			console.log("%ccomponentDidUpdate", colorStyle);
			console.log("user", prevProps.pickedUser.id, "time", this.time);
			this.time = 0;
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.time++;
			}, 1000);
			await this.fetchData();
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		console.log("stop counting");
		console.log("%ccomponentWillUnmount", colorStyle);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			nextProps.pickedUser.id !== this.props.pickedUser.id ||
			nextState.isLoading !== this.state.isLoading ||
			nextState.user.id !== this.state.user.id
		) {
			return true;
		}
		return false;
	}

	render() {
		console.log("%cclass rendering...", colorStyle);
		return <div>{this.state.isLoading ? "loading..." : this.state.user.username}</div>;
	}
}

export default User;
