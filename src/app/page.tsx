"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Heart,
	Sparkles,
	Star,
	ArrowRight,
	ArrowLeft,
	Play,
	Pause,
	Volume2,
	Menu,
	X,
} from "lucide-react";

export default function Home() {
	const [currentScene, setCurrentScene] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const scenes = [
		{
			id: 0,
			title: "Flitz",
			subtitle: "Dear Leila",
			bg: "from-pink-100 via-purple-100 to-indigo-100",
			content:
				"I hope this email finds you well. My Dartmouth email formally expires tomorrow, which means I must move a lot of files to my local storage and whatever else. I wanted to flitz you before it all expired.",
		},
		{
			id: 1,
			title: "Flitz",
			subtitle: "",
			bg: "from-rose-100 via-pink-100 to-purple-100",
			content:
				"I have flitzed you before, but it's not the same, and I want to flitz you one last time! I knew when I met you that we would not only hit it off, but be much more than that. It makes me so happy to see where we are now.",
		},
		{
			id: 2,
			title: "Flitz",
			subtitle: "",
			bg: "from-purple-100 via-indigo-100 to-blue-100",
			content:
				"I'm glad to see my prediction is correct because I've always admired you from afar and did nothing about it (should have acted winter term).",
		},
		{
			id: 3,
			title: "Flitz",
			subtitle: "",
			bg: "from-blue-100 via-cyan-100 to-teal-100",
			content:
				"As you are aware, senior spring is a time for exploration and scandals, but I'm so glad that my senior spring was defined by you. Although senior spring was for many a time of brutal honesty and drama, I really wanted to date you like since mid May and I was too scared to tell you because I didn't know how you felt.",
		},
		{
			id: 4,
			title: "Flitz",
			subtitle: "I love you",
			bg: "from-red-100 via-pink-100 to-rose-100",
			content:
				"My shayla, my drinking partner, and most importantly, my best friend, I love you!",
		},
	];

	// Check if device is mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const nextScene = () => {
		setCurrentScene((prev) => (prev + 1) % scenes.length);
	};

	const prevScene = () => {
		setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length);
	};

	// Auto-advance scenes
	useEffect(() => {
		const timer = setInterval(() => {
			if (isPlaying) {
				nextScene();
			}
		}, 5000);

		return () => clearInterval(timer);
	}, [isPlaying, currentScene]);

	// Touch/swipe handlers for mobile
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);
	const [showSwipeHint, setShowSwipeHint] = useState(true);
	const [swipeOffset, setSwipeOffset] = useState(0);
	const [isSwiping, setIsSwiping] = useState(false);

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
		setSwipeOffset(0);
		setIsSwiping(true);
		setShowSwipeHint(false);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isSwiping) return;

		const currentTouch = e.targetTouches[0].clientX;
		const offset = currentTouch - touchStart;
		setSwipeOffset(offset);
		setTouchEnd(currentTouch);
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 100;
		const isRightSwipe = distance < -100;

		if (isLeftSwipe) {
			nextScene();
		} else if (isRightSwipe) {
			prevScene();
		}

		// Reset values
		setTouchStart(0);
		setTouchEnd(0);
		setSwipeOffset(0);
		setIsSwiping(false);
	};

	return (
		<div
			className="min-h-screen relative overflow-hidden"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{/* Mobile Menu Button */}
			{isMobile && (
				<motion.button
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					onClick={() => setShowMobileMenu(!showMobileMenu)}
					className="absolute top-4 left-4 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
				>
					{showMobileMenu ? <X size={20} /> : <Menu size={20} />}
				</motion.button>
			)}

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobile && showMobileMenu && (
					<motion.div
						initial={{ opacity: 0, x: -300 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -300 }}
						className="absolute top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-md z-40 p-6 shadow-xl"
					>
						<div className="mt-16">
							<h3 className="text-xl font-bold text-gray-800 mb-6">
								My Flitz to Leila
							</h3>
							<div className="space-y-4">
								{scenes.map((scene, index) => (
									<motion.button
										key={index}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => {
											setCurrentScene(index);
											setShowMobileMenu(false);
										}}
										className={`w-full text-left p-4 rounded-lg transition-all ${
											index === currentScene
												? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
												: "bg-gray-50 hover:bg-gray-100 text-gray-700"
										}`}
									>
										<div className="flex items-center space-x-3">
											<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
												{index + 1}
											</div>
											<div>
												<div className="font-semibold">{scene.title}</div>
												{scene.subtitle && (
													<div className="text-sm opacity-80">
														{scene.subtitle}
													</div>
												)}
											</div>
										</div>
									</motion.button>
								))}
							</div>

							<div className="mt-8 pt-6 border-t border-gray-200">
								<button
									onClick={() => setIsPlaying(!isPlaying)}
									className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold"
								>
									{isPlaying ? <Pause size={20} /> : <Play size={20} />}
									<span>{isPlaying ? "Pause" : "Play"} Flitz</span>
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Background Music Controls - Hidden on mobile when menu is open */}
			{(!isMobile || !showMobileMenu) && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
					className={`absolute top-4 ${
						isMobile ? "right-4" : "right-4"
					} z-50 flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg`}
				>
					<button
						onClick={() => setIsPlaying(!isPlaying)}
						className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-110 transition-transform"
					>
						{isPlaying ? (
							<Pause size={isMobile ? 14 : 16} />
						) : (
							<Play size={isMobile ? 14 : 16} />
						)}
					</button>
					<Volume2 size={isMobile ? 14 : 16} className="text-gray-600" />
				</motion.div>
			)}

			{/* Navigation Controls - Hidden on mobile */}
			{!isMobile && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
					className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg"
				>
					<button
						onClick={prevScene}
						className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform"
					>
						<ArrowLeft size={16} />
					</button>
					<div className="flex space-x-1">
						{scenes.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentScene(index)}
								className={`w-2 h-2 rounded-full transition-all ${
									index === currentScene
										? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125"
										: "bg-gray-300 hover:bg-gray-400"
								}`}
							/>
						))}
					</div>
					<button
						onClick={nextScene}
						className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-110 transition-transform"
					>
						<ArrowRight size={16} />
					</button>
				</motion.div>
			)}

			{/* Mobile Navigation Dots - Only on mobile */}
			{isMobile && !showMobileMenu && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2"
				>
					{scenes.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentScene(index)}
							className={`w-3 h-3 rounded-full transition-all ${
								index === currentScene
									? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125"
									: "bg-white/60 hover:bg-white/80"
							}`}
						/>
					))}
				</motion.div>
			)}

			{/* Floating Hearts - Reduced count on mobile */}
			<div className="fixed inset-0 pointer-events-none z-10">
				{[...Array(isMobile ? 10 : 20)].map((_, i) => (
					<motion.div
						key={i}
						initial={{
							x:
								Math.random() *
								(isMobile
									? 400
									: typeof window !== "undefined"
									? window.innerWidth
									: 1200),
							y:
								(typeof window !== "undefined" ? window.innerHeight : 800) +
								100,
							opacity: 0,
						}}
						animate={{
							y: -100,
							opacity: [0, 1, 0],
							rotate: [0, 360],
						}}
						transition={{
							duration: Math.random() * 10 + 10,
							repeat: Infinity,
							delay: Math.random() * 5,
						}}
						className="absolute"
					>
						<Heart
							size={Math.random() * (isMobile ? 15 : 20) + (isMobile ? 8 : 10)}
							className="text-pink-400/60"
							fill="currentColor"
						/>
					</motion.div>
				))}
			</div>

			{/* Floating Stars - Reduced count on mobile */}
			<div className="fixed inset-0 pointer-events-none z-10">
				{[...Array(isMobile ? 8 : 15)].map((_, i) => (
					<motion.div
						key={i}
						initial={{
							x:
								Math.random() *
								(isMobile
									? 400
									: typeof window !== "undefined"
									? window.innerWidth
									: 1200),
							y:
								Math.random() *
								(typeof window !== "undefined" ? window.innerHeight : 800),
							opacity: 0,
						}}
						animate={{
							opacity: [0, 1, 0],
							scale: [0, 1, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: Math.random() * 8 + 5,
							repeat: Infinity,
							delay: Math.random() * 3,
						}}
						className="absolute"
					>
						<Star
							size={Math.random() * (isMobile ? 12 : 15) + (isMobile ? 6 : 8)}
							className="text-yellow-400/40"
							fill="currentColor"
						/>
					</motion.div>
				))}
			</div>

			{/* Scene Container */}
			<AnimatePresence mode="wait">
				<motion.div
					key={currentScene}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{
						opacity: 1,
						scale: 1,
						x: isMobile ? swipeOffset * 0.3 : 0, // Visual swipe feedback on mobile
					}}
					exit={{ opacity: 0, scale: 1.2 }}
					transition={{
						duration: isSwiping ? 0 : 0.8,
						ease: isSwiping ? "linear" : "easeInOut",
					}}
					className={`min-h-screen bg-gradient-to-br ${scenes[currentScene].bg} relative flex items-center justify-center p-4 sm:p-8`}
				>
					{/* Scene Content */}
					<div className="text-center max-w-4xl mx-auto relative z-20">
						{/* Scene Number */}
						<motion.div
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="mb-6 sm:mb-8"
						>
							<div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl sm:text-2xl font-bold shadow-lg">
								{currentScene + 1}
							</div>
						</motion.div>

						{/* Title */}
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
						>
							{scenes[currentScene].title}
						</motion.h1>

						{/* Subtitle */}
						{scenes[currentScene].subtitle && (
							<motion.p
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
								className="text-lg sm:text-2xl md:text-3xl text-gray-700 mb-6 sm:mb-8 font-light"
							>
								{scenes[currentScene].subtitle}
							</motion.p>
						)}

						{/* Content */}
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9 }}
							className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
						>
							{scenes[currentScene].content}
						</motion.p>

						{/* Interactive Elements based on scene */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 1.1 }}
							className="flex justify-center"
						>
							{currentScene === 0 && (
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={nextScene}
									className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg cursor-pointer"
								>
									<Sparkles size={isMobile ? 20 : 24} />
									<span>Read My Flitz</span>
								</motion.button>
							)}

							{currentScene === 1 && (
								<motion.div
									animate={{ rotate: [0, 10, -10, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
									className="text-4xl sm:text-6xl"
								>
									💌
								</motion.div>
							)}

							{currentScene === 2 && (
								<motion.div
									animate={{ scale: [1, 1.2, 1] }}
									transition={{ duration: 2, repeat: Infinity }}
									className="text-4xl sm:text-6xl"
								>
									🌱
								</motion.div>
							)}

							{currentScene === 3 && (
								<motion.div
									animate={{ y: [0, -20, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
									className="text-4xl sm:text-6xl"
								>
									✨
								</motion.div>
							)}

							{currentScene === 4 && (
								<motion.div
									animate={{
										scale: [1, 1.3, 1],
										rotate: [0, 5, -5, 0],
									}}
									transition={{ duration: 1.5, repeat: Infinity }}
									className="text-6xl sm:text-8xl"
								>
									💖
								</motion.div>
							)}
						</motion.div>
					</div>

					{/* Scene-specific decorative elements */}
					{currentScene === 0 && (
						<>
							<motion.div
								animate={{
									x: [0, isMobile ? 50 : 100, 0],
									y: [0, isMobile ? -25 : -50, 0],
									rotate: [0, 360],
								}}
								transition={{ duration: 8, repeat: Infinity }}
								className="absolute top-20 left-4 sm:left-20 text-2xl sm:text-4xl"
							>
								🌙
							</motion.div>
							<motion.div
								animate={{
									x: [0, isMobile ? -40 : -80, 0],
									y: [0, isMobile ? 30 : 60, 0],
									rotate: [0, -360],
								}}
								transition={{ duration: 10, repeat: Infinity }}
								className="absolute bottom-20 right-4 sm:right-20 text-2xl sm:text-4xl"
							>
								☀️
							</motion.div>
						</>
					)}

					{currentScene === 1 && (
						<motion.div
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{ duration: 3, repeat: Infinity }}
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-9xl opacity-20"
						>
							💌
						</motion.div>
					)}

					{currentScene === 2 && (
						<div className="absolute inset-0 overflow-hidden">
							{[...Array(isMobile ? 4 : 8)].map((_, i) => (
								<motion.div
									key={i}
									initial={{
										x:
											Math.random() *
											(isMobile
												? 400
												: typeof window !== "undefined"
												? window.innerWidth
												: 1200),
										y:
											(typeof window !== "undefined"
												? window.innerHeight
												: 800) + 100,
										opacity: 0,
									}}
									animate={{
										y: -100,
										opacity: [0, 1, 0],
										rotate: [0, 360],
									}}
									transition={{
										duration: Math.random() * 5 + 8,
										repeat: Infinity,
										delay: Math.random() * 3,
									}}
									className="absolute text-2xl sm:text-3xl"
								>
									🌸
								</motion.div>
							))}
						</div>
					)}

					{currentScene === 3 && (
						<motion.div
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, 180, 360],
							}}
							transition={{ duration: 4, repeat: Infinity }}
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-8xl opacity-30"
						>
							⭐
						</motion.div>
					)}

					{currentScene === 4 && (
						<div className="absolute inset-0">
							{[...Array(isMobile ? 6 : 12)].map((_, i) => (
								<motion.div
									key={i}
									animate={{
										scale: [0, 1, 0],
										opacity: [0, 1, 0],
										x: [
											0,
											Math.random() * (isMobile ? 100 : 200) -
												(isMobile ? 50 : 100),
										],
										y: [
											0,
											Math.random() * (isMobile ? 100 : 200) -
												(isMobile ? 50 : 100),
										],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										delay: i * 0.2,
									}}
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl"
								>
									💕
								</motion.div>
							))}
						</div>
					)}
				</motion.div>
			</AnimatePresence>

			{/* Progress Bar */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 z-50"
				style={{
					transform: `scaleX(${(currentScene + 1) / scenes.length})`,
					transformOrigin: "left",
				}}
			/>

			{/* Swipe Instructions for Mobile */}
			{isMobile && !showMobileMenu && showSwipeHint && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2 }}
					className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 text-center"
				>
					<motion.div
						animate={{
							x: [-10, 10, -10],
							scale: [1, 1.05, 1],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-gray-700 shadow-lg border border-gray-200"
					>
						<div className="flex items-center space-x-2">
							<motion.div
								animate={{ x: [-5, 5, -5] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								👈
							</motion.div>
							<span className="font-medium">Swipe to navigate</span>
							<motion.div
								animate={{ x: [5, -5, 5] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								👉
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Visual Swipe Indicators */}
			{isMobile && !showMobileMenu && (
				<>
					{/* Left Swipe Indicator */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{
							opacity: isSwiping && swipeOffset > 50 ? 0.8 : 0,
							x: isSwiping && swipeOffset > 50 ? 0 : -50,
						}}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30"
					>
						<div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
							<ArrowRight size={24} className="text-pink-500" />
						</div>
					</motion.div>

					{/* Right Swipe Indicator */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{
							opacity: isSwiping && swipeOffset < -50 ? 0.8 : 0,
							x: isSwiping && swipeOffset < -50 ? 0 : 50,
						}}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30"
					>
						<div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
							<ArrowLeft size={24} className="text-purple-500" />
						</div>
					</motion.div>

					{/* Swipe Progress Bar */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: isSwiping ? 0.6 : 0,
						}}
						className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30"
					>
						<div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-700 shadow-lg">
							<div className="flex items-center space-x-2">
								<div className="w-20 h-1 bg-gray-300 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
										style={{
											width: `${Math.min(Math.abs(swipeOffset) / 2, 100)}%`,
											transform:
												swipeOffset > 0 ? "translateX(0)" : "translateX(100%)",
										}}
									/>
								</div>
								<span className="text-xs">
									{Math.abs(swipeOffset) > 100 ? "Release!" : "Keep swiping..."}
								</span>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</div>
	);
}
