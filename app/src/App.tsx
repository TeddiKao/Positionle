import { Route, Routes } from "react-router";

import "./app/global.css";
import GamePage from "./features/gameplay/pages/GamePage.tsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<GamePage />} />
		</Routes>
	);
}

export default App;
