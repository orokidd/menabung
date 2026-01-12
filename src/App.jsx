import { useState, useEffect } from "react";
import "./App.css";
import catstare from "./assets/catstare.gif";
import doodle1 from "./assets/doodle1.png";
import doodle2 from "./assets/doodle2.png";

const BOX_COUNT = 550;

function createInitialSavings() {
	let savings = [];
	for (let i = 0; i < BOX_COUNT; i++) {
		savings.push({ id: i, saved: false });
	}
	return savings;
}

function App() {
	const stored = localStorage.getItem("savings");

	const [savings, setSavings] = useState(stored ? JSON.parse(stored) : createInitialSavings());

	const toggleDay = (id) => {
		setSavings((prev) => prev.map((day) => (day.id === id ? { ...day, saved: !day.saved } : day)));
	};

	const savedCount = savings.filter((day) => day.saved).length;
	const totalAmount = savedCount * 20000;

	useEffect(() => {
		localStorage.setItem("savings", JSON.stringify(savings));
	}, [savings]);

	return (
		<div className="app">
			<div className="header">
				<img src={doodle1} className="doodle-img left" alt="doodle image" />
				<img src={doodle2} className="doodle-img right" alt="doodle image" />
				<h1 className="header-text">Serina Menabung</h1>
			</div>

			<div className="total-reset">
				<p className="header-total">Total: Rp {totalAmount.toLocaleString()}</p>

				<div className="reset">
					<button
						onClick={() => {
							localStorage.removeItem("savings");
							setSavings(createInitialSavings());
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw">
							<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
							<path d="M3 3v5h5" />
						</svg>
					</button>
				</div>
			</div>

			<div className="grid-container">
				<div className="grid">
					{savings.map((day, index) => (
						<div key={day.id} className={`box ${day.saved ? "saved" : ""}`} onClick={() => toggleDay(day.id)}>
							<p className="box-text">20k</p>
						</div>
					))}
				</div>
			</div>

			<div className="footer">
				<p>Made with love by your bf❤️</p>
				<a href="https://www.youtube.com/watch?v=kn-qWbU4tC8">
					<img src={catstare} className="cat-img" alt="cat stare image" />
				</a>
			</div>
		</div>
	);
}

export default App;
