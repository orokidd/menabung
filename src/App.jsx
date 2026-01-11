import { useState, useEffect } from "react";
import "./App.css";

const BOX_COUNT = 550;

function App() {
	const stored = localStorage.getItem("savings");

	const initialDays = Array.from({ length: BOX_COUNT }, (_, i) => ({
		id: i,
		saved: false,
	}));

	const [days, setDays] = useState(stored ? JSON.parse(stored) : initialDays);

	useEffect(() => {
		localStorage.setItem("savings", JSON.stringify(days));
	}, [days]);

	const toggleDay = (index) => {
		const newDays = [...days];
		newDays[index].saved = !newDays[index].saved;
		setDays(newDays);
	};

	const savedCount = days.filter((day) => day.saved).length;
	const totalAmount = savedCount * 20000;

	return (
		<div className="app">
			<h1 className="header">Serina Menabung</h1>
			<div className="total-reset">
				<p className="header-total">Total: Rp {totalAmount.toLocaleString()}</p>

				<div className="reset">
					<button
						onClick={() => {
							localStorage.removeItem("savings");
							setDays(initialDays);
						}}>
						Reset Savings
					</button>
				</div>
			</div>

			<div className="grid">
				{days.map((day, index) => (
					<div key={index} className={`box ${day.saved ? "saved" : ""}`} onClick={() => toggleDay(index)}>
						20k
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
