import "./App.css";
import HookUsers from "./hook/HookUsers";
import Users from "./hook/Users";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h4 style={{ color: "limegreen" }}>class</h4>
				<Users></Users>
				<br />
				<br />
				<h4 style={{ color: "salmon" }}>hook</h4>
				<HookUsers></HookUsers>
			</header>
		</div>
	);
}

export default App;
