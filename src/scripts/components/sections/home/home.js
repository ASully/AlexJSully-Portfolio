// CSS
import "./home.css";
// React
import React, {Suspense, lazy, useEffect, useState} from "react";
// Interactive elements
import {WordCarousel} from "../../../interactivity/word-carousel";
import {aaaahhhh} from "../../../interactivity/aaaahhhh";
import {createHoverColourWords} from "../../../interactivity/create-hover-words";
import {handleMoveBackground} from "../../../interactivity/background-move";
// Images
import ProfilePic from "../../../../images/me_drawn/profile_pic_drawn.webp";
import SneezePicStart from "../../../../images/me_drawn/profile_pic_drawn_2.webp";
import SneezingPic from "../../../../images/me_drawn/profile_pic_drawn_3.webp";
import SneezingUnsatisfied from "../../../../images/me_drawn/profile_pic_drawn_4.webp";

// Lazy load Material-UI components
// Material-UI
const Checkbox = lazy(() => import("@mui/material/Checkbox"));
const FormControlLabel = lazy(() => import("@mui/material/FormControlLabel"));
const Skeleton = lazy(() => import("@mui/material/Skeleton"));

/** Landing for portfolio website */
export default function Home() {
	const [displayAccessibilityToggles, setDisplayAccessibilityToggles] = useState(null);

	/** Professional descriptions */
	const descriptionCarousel = [
		"Bioinformatician",
		"Computational Biologist",
		"Data Visualization Programmer",
		"Full-Stack Web Developer",
		"Laboratory Researcher",
	];
	/** How many times the user has hovered over the profile picture */
	let hoveredProfilePic = 0;
	/** The number of times the profile picture has sneezed */
	let sneezeCounter = 0;
	/** AAAHHH */
	let aaahhh = false;

	/**
	 * Handle profile picture sneezing
	 */
	function handleTriggerSneeze() {
		// If not trigger easter egg:
		if (!aaahhh) {
			// Add to hover count
			hoveredProfilePic += 1;

			// Every 5 times hovered/clicked, trigger sneeze easter egg
			if (hoveredProfilePic % 5 === 0) {
				if (sneezeCounter < 5) {
					document.getElementById("profilePic").src = SneezePicStart;

					// Have animation trigger based off time
					setTimeout(() => {
						document.getElementById("profilePic").src = SneezingPic;
					}, 500);

					setTimeout(() => {
						document.getElementById("profilePic").src = SneezingUnsatisfied;
					}, 800);

					setTimeout(() => {
						document.getElementById("profilePic").src = ProfilePic;
					}, 1500);

					sneezeCounter += 1;
				} else {
					// Trigger sneeze easter egg
					aaahhh = true;
					setTimeout(() => {
						aaaahhhh();
					}, 2801);
				}
			}
		}
	}

	/**
	 * Enable (or disable) global dyslexia font
	 */
	function handleGlobalDyslexia() {
		if (document.getElementById("dyslexia-toggle").checked) {
			document.getElementsByTagName("body")[0].classList.add("dyslexia-global");
		} else {
			document.getElementsByTagName("body")[0].classList.remove("dyslexia-global");
		}
	}

	/**
	 * Create accessibility toggle/checkbox in JSX
	 */
	function createAccessibilityToggles() {
		if (!displayAccessibilityToggles) {
			setDisplayAccessibilityToggles(
				<Suspense fallback={<Skeleton width="178px" height="42px" sx={{bgcolor: "#1e222796"}} />}>
					<FormControlLabel
						control={
							<Checkbox
								id="dyslexia-toggle"
								onChange={() => handleGlobalDyslexia()}
								color="secondary"
								key="dyslexia-toggle"
								role="checkbox"
							/>
						}
						className="accessibility-toggles dyslexia-toggle"
						label="Dyslexic Font"
						title="Change all font to OpenDyslexic2"
						key="accessibility-toggles"
						role="switch"
					/>
				</Suspense>,
			);
		}
	}

	useEffect(() => {
		WordCarousel("description-Carousel", descriptionCarousel);
		createAccessibilityToggles();

		// If IE, change profile picture to jpg version
		if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Trident") !== -1) {
			import("../../../../images/me_drawn/profile_pic_drawn.jpg").then((img) => {
				ProfilePic = img.default;
			});

			// Do same for sneezing profile pictures
			import("../../../../images/me_drawn/profile_pic_drawn_2.jpg").then((img) => {
				SneezePicStart = img.default;
			});
			import("../../../../images/me_drawn/profile_pic_drawn_3.jpg").then((img) => {
				SneezingPic = img.default;
			});
			import("../../../../images/me_drawn/profile_pic_drawn_4.jpg").then((img) => {
				SneezingUnsatisfied = img.default;
			});
		}
	});

	return (
		<div className="home" id="home" key="home-Container" onMouseMove={(e) => handleMoveBackground(e, "App")}>
			{displayAccessibilityToggles}
			<img
				className="profilePic"
				id="profilePic"
				key="home-ProfilePic"
				src={ProfilePic}
				alt="Drawn version of me"
				onMouseEnter={() => handleTriggerSneeze()}
				onClick={() => handleTriggerSneeze()}
			/>
			<h1 className="h2-description" key="home-Name" role="banner">
				{createHoverColourWords("Alexander Joo-Hyun Sullivan", "hover-Name")}
			</h1>
			<span
				id="description-Carousel"
				className="carousel-description h3-description"
				key="home-DescriptionCarousel"
				role="heading"
				aria-level="1"
			/>
			<h2
				className="h3-description"
				id="no-motion-description"
				key="home-NoMotionDescription"
				aria-level="1"
				hidden
			>
				Full-Stack Web Developer | Bioinformatician | Gamer
			</h2>
		</div>
	);
}
