import React, { useEffect, useState } from 'react';
import './App.css';

const bankOne = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Heater-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Heater-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Heater-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Heater-4',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Clap',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: "Kick-n'-Hat",
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
	},
];

const bankTwo = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Chord-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Chord-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Chord-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Shaker',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: 'Punchy-Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Side-Stick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Snare',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
	},
];

function App() {
	const [bank, setBank] = useState({ type: 1, bank: bankOne });
	const [volume, setVolume] = useState(0.3);
	const [display, setDisplay] = useState('#');

	const handleBankChange = () => {
		if (bank.type === 1) {
			setBank({ type: 2, bank: bankTwo });
		} else {
			setBank({ type: 1, bank: bankOne });
		}
	};

	const handleVolumeChange = (e) => {
		setVolume(e.target.value);
		setDisplay('Volume: ' + Math.round(e.target.value * 100));
		setTimeout(() => setDisplay('#'), 700);
		// console.log(e.target.value);
	};

	let clips = document.getElementsByClassName('clip');
	clips = [...clips];
	clips.forEach((audio) => {
		audio.volume = volume;
	});
	console.log(clips);

	return (
		<div className="App">
			<div className="container" id="drum-machine">
				<div className="pad__container">
					{bank.bank &&
						bank.bank.map((sound) => {
							return (
								<Pad key={sound.id} {...sound} updateDisplay={setDisplay} />
							);
						})}
				</div>
				<div className="controllers">
					<div className="switch" onClick={handleBankChange}>
						<div
							style={{ left: bank.type === 2 ? 30 : null }}
							onClick={handleBankChange}
						></div>
					</div>
					<div className="volume">
						<input
							type="range"
							max="1"
							min="0"
							step="0.01"
							value={volume}
							onChange={handleVolumeChange}
						/>
					</div>
					<div id="display">{display}</div>
				</div>
			</div>
		</div>
	);
}

const activeStyle = {
	boxShadow: 'inset 10px 10px 20px #1e1e1e, inset -10px -10px 20px #2e2e2e',
};

const inactiveStyle = {
	boxShadow: '10px 10px 20px #1e1e1e, -10px -10px 40px #2e2e2e',
};

const Pad = ({ keyCode, keyTrigger, id, url, updateDisplay }) => {
	const [play, setPlay] = useState(false);
	const [padStyle, setPadStyle] = useState(inactiveStyle);

	const activePad = () => {
		setPlay((state) => {
			return !state;
		});
	};

	useEffect(() => {
		console.log(play);
		if (play) {
			setPadStyle(activeStyle);
		} else {
			setPadStyle(inactiveStyle);
		}
	}, [play]);

	const handleKeyDown = (e) => {
		if (e.keyCode === keyCode) {
			playAudio();
		}
	};
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	const playAudio = () => {
		const sound = document.getElementById(keyTrigger);
		updateDisplay(id);
		sound.currentTime = 0;
		sound.play();
		activePad();
		setTimeout(() => {
			activePad();
			updateDisplay('#');
		}, 500);
	};

	return (
		<div className="drum-pad" id={id} style={padStyle} onClick={playAudio}>
			{keyTrigger}
			<audio className="clip" id={keyTrigger} src={url} />
		</div>
	);
};

export default App;
