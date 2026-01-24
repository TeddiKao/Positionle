import { BrowserRouter, Route, Routes } from "react-router"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<h1>Home Page</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
