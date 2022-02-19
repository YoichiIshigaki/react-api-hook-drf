import logo from "./logo.svg";
import "./App.css";
import DrfApiFetch from "./components/DrfApiFetch";
import DrfApiFetchById from "./components/DrfApiFetchById";

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<DrfApiFetch />
				<DrfApiFetchById/>
			</header>
		</div>
	);
};

export default App;
