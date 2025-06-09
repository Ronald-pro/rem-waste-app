import React from "react";
import { wasteCard, wasteImage, skipButton } from "../styles/main";

const WasteCard = ({ waste, skipImages, isSelected, onSelect }) => (
	<div
		className={`${wasteCard} ${
			isSelected ? "ring-2 ring-blue-500" : ""
		} transition relative`}
		tabIndex={0}
		aria-label={`${waste.size} yard skip card`}
	>
		<div className="relative">
			<img
				src={skipImages}
				alt={`${waste.size} Yard Skip`}
				className={`${wasteImage} w-full object-cover rounded-md mb-4`}
			/>
			<span className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
				{waste.size} Yards
			</span>
		</div>
		<div className="flex justify-between items-center mb-2">
			<h3 className="text-lg font-bold text-white">{waste.size} Yard Skip</h3>
			<p className="text-xl font-extrabold text-blue-400">£{(waste.price_before_vat * 1.2).toFixed(0)}</p>
		</div>
		<p className="text-gray-400 text-sm mb-3">
			{waste.hire_period_days} day hire period
		</p>
		<div className="flex flex-wrap gap-2 mb-4">
			{waste.allowed_on_road && (
				<span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
					On Road
				</span>
			)}
			{waste.allows_heavy_waste && (
				<span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
					Heavy Waste
				</span>
			)}
		</div>
		<button
			className={`${skipButton} ${isSelected ? "bg-green-600 hover:bg-green-700" : ""}`}
			onClick={onSelect}
		>
			{isSelected ? "Selected" : "Select This Skip"}
		</button>
	</div>
);

export default WasteCard;
