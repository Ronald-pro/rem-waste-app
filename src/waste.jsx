import React, { useEffect, useState } from "react";
import skipImages from "./assets/images/yarder-skip.jpg";
import WasteCard from "./components/WasteCard";
import {steps} from "./components/HeaderStep";
import Skeleton from "react-loading-skeleton";
import {
	mainContainer,
	stepContainer,
	continueButton,
	stepIcon,
	topNavBar,
	stepItem,
	stepLabelBase,
	stepLabelActive,
	stepLabelInactive,
	h2Tag,
	hrTag,
	gridcontainer,
	footerTag
} from "./styles/main";
import "react-loading-skeleton/dist/skeleton.css";

const Waste = () => {
	const [wastes, setWastes] = useState([]);
	const [selectedWaste, setSelectedWaste] = useState(null);

	useEffect(() => {
		fetch(
			"https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
		)
			.then((res) => {
				if (!res.ok) throw new error("Failed to fetch skips sizes.");
				return res.json();
			})
			.then((data) => setWastes(data))
			.catch((err) => setError(err.message));
	}, []);
	return (
		<div className={mainContainer}>
			<nav className={topNavBar}>
				{steps.map((step, idx) => (
					<React.Fragment key={step.label}>
						{idx !== 0 && (
							<span className="hidden sm:inline mx-2 text-gray-600">─</span>
						)}
						<div className={stepItem}>
							<step.icon className={stepIcon} aria-hidden="true" />
							<span
								className={`${stepLabelBase} ${
									idx === 2 ? stepLabelActive : stepLabelInactive
								}`}
							>
								{step.label}
							</span>
						</div>
					</React.Fragment>
				))}
			</nav>
			<main className={stepContainer}>
				<div className="container mx-auto">
					<h2 className={h2Tag}>Choose Your Skip Size</h2>
					<p className="text-center text-gray-400 mb-6 sm:mb-10 text-base sm:text-lg">
						Select the skip size that best suits your needs
					</p>
					<hr className={hrTag} />
					{wastes.length === 0 ? (
						<div className={gridcontainer}>
							{[...Array(3)].map((_, i) => (
								<div key={i} className="p-4 bg-gray-800 rounded-lg">
									<Skeleton height={200} />
									<Skeleton count={3} className="mt-2" />
								</div>
							))}
						</div>
					) : (
						<div className={gridcontainer}>
							{wastes.map((waste) => (
								<div
									key={waste.id}
									className={`transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
										selectedWaste?.id === waste.id ? "ring-2 ring-blue-500" : ""
									}`}
									onClick={() => setSelectedWaste(waste)}
								>
									<WasteCard
										waste={waste}
										skipImages={skipImages}
										isSelected={selectedWaste === waste}
										onSelect={() => setSelectedWaste(waste)}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</main>
			{selectedWaste && (
				<div className="fixed bottom-4 w-full px-4 sm:px-0 sm:right-4 sm:w-auto z-50 flex justify-center sm:justify-end">
					<button className={continueButton}>
						Continue
						<ArrowRightIcon className="h-5 w-5" />
					</button>
				</div>
			)}
			<footer className={footerTag}>© 2025, We Want Waste</footer>
		</div>
	);
};

export default Waste;
