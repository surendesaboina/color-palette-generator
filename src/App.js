import React, { Component } from "react"; 
import "./App.css"; 

class App extends Component { 
	constructor() { 
		super(); 
		this.state = { 
			colorList: [], 
			copiedColorIndex: null, 
			searchInput: "", 
			matchingColors: [], 
		}; 
	} 

	componentDidMount() { 
		this.generateColorPalette(); 
	} 

	generateColorPalette = () => { 
		const maxColorBoxes = 21; 
		const colorList = []; 

		for (let i = 0; i < maxColorBoxes; i++) { 
			const randomHexColor = `#${Math.floor(Math.random() * 0xffffff) 
				.toString(16) 
				.padStart(6, "0")}`; 
			colorList.push(randomHexColor); 
		} 

		this.setState({ colorList, copiedColorIndex: null }); 
	}; 

	copyColorToClipboard = (hexValue, index) => { 
		navigator.clipboard 
			.writeText(hexValue) 
			.then(() => { 
				this.setState({ copiedColorIndex: index }); 
			}) 
			.catch(() => { 
				alert("Failed to copy the color code!"); 
			}); 
	}; 

	handleSearchChange = (e) => { 
		const searchInput = e.target.value.toLowerCase(); 

		// Color mapping with arrays of related colors 
		const colorMapping = { 
			red: [
				"#FF0000", "#FF5733", "#c21919", "#FF6347", "#FF4500",
				"#FF6666", "#FF3333", "#FF9999", "#FF4d4d", "#FF1919",
				"#FFB6C1", "#FA8072", "#E9967A", "#FFA07A", "#FF7F50",
				"#FFA07A", "#CD5C5C", "#FF8C00", "#DC143C", "#FF4500",
				"#8B0000", "#B22222", "#DC143C", "#CD5C5C", "#8B4513",
				"#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FF00FF"
			],
			green: [
				"#00FF00", "#33FF73", "#C3FF00", "#228B22", "#008000",
				"#7FFF00", "#32CD32", "#00FA9A", "#90EE90", "#98FB98",
				"#ADFF2F", "#2E8B57", "#3CB371", "#556B2F", "#8FBC8B",
				"#00FF00", "#32CD32", "#7FFF00", "#00FA9A", "#00FF7F",
				"#228B22", "#008000", "#ADFF2F", "#556B2F", "#8FBC8B",
				"#006400", "#008B8B", "#20B2AA", "#40E0D0", "#00CED1"
			],
			blue: [
				"#0000FF", "#3373FF", "#00C3FF", "#1E90FF", "#4169E1",
				"#87CEEB", "#6495ED", "#87CEFA", "#4682B4", "#B0C4DE",
				"#AFEEEE", "#00CED1", "#20B2AA", "#5F9EA0", "#008B8B",
				"#0000FF", "#4169E1", "#6495ED", "#B0C4DE", "#1E90FF",
				"#87CEEB", "#4682B4", "#00CED1", "#20B2AA", "#5F9EA0",
				"#008B8B", "#00688B", "#4682B4", "#87CEEB", "#AFEEEE"
			],
			yellow: [
				"#FFFF00", "#FFD700", "#FFEA00", "#F0E68C", "#FFAC33",
				"#FFD700", "#FFFF00", "#FFFA00", "#FFFACD", "#FFD700",
				"#DAA520", "#FFC125", "#FFDB58", "#FFC300", "#FFD700",
				"#FFD700", "#FFA500", "#FF4500", "#FF6347", "#FF8C00",
				"#FFD700", "#FFD700", "#FFA500", "#FF8C00", "#FF6347",
				"#DAA520", "#B8860B", "#FFD700", "#FFA500", "#FF8C00"
			],
			pink: [
				"#FFC0CB", "#FF69B4", "#FF1493", "#FF6EB4", "#FF82AB",
				"#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FF00FF",
				"#FFB6C1", "#FA8072", "#E9967A", "#FFA07A", "#FF7F50",
				"#FFA07A", "#CD5C5C", "#FF8C00", "#DC143C", "#FF4500",
				"#8B0000", "#B22222", "#DC143C", "#CD5C5C", "#8B4513",
				"#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FF00FF"
			],
			purple: [
				"#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF",
				"#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF",
				"#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF",
				"#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF",
				"#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF",
				"#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF"
			],
			orange: [
				"#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500",
				"#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500",
				"#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500",
				"#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500",
				"#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500",
				"#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500"
			],
			brown: [
				"#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887",
				"#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887",
				"#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887",
				"#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887",
				"#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887",
				"#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887"
			],
			cyan: [
				"#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD",
				"#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD",
				"#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD",
				"#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD",
				"#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD",
				"#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD"
			],
			magenta: [
				"#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4",
				"#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4",
				"#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4",
				"#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4",
				"#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4",
				"#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4"
			], 
			teal: ["#008080", "#008B8B", "#00FFFF", "#20B2AA", "#40E0D0"], 
			navy: ["#000080", "#00008B", "#0000FF", "#4169E1", "#0000CD"], 
			lime: ["#00FF00", "#32CD32", "#7FFF00", "#00FA9A", "#00FF7F"], 
			maroon: ["#800000", "#8B0000", "#B22222", "#A52A2A", "#800000"], 
			olive: ["#808000", "#6B8E23", "#556B2F", "#8FBC8B", "#9ACD32"], 
			silver: ["#C0C0C0", "#D3D3D3", "#DCDCDC", "#BEBEBE", "#A9A9A9"], 
			black: ["#000000", "#080808", "#121212", "#1C1C1C", "#262626"], 
			white: ["#FFFFFF", "#F5F5F5", "#FAFAFA", "#E0E0E0", "#D3D3D3"], 
			// Add more color mappings as needed 
		}; 

		// Check if the search input matches any color name 
		const matchingColors = colorMapping[searchInput] || []; 

		this.setState({ searchInput, matchingColors }); 
	}; 

	render() { 
		const filteredColorList = 
			this.state.matchingColors.length > 0 
				? this.state.matchingColors 
				: this.state.colorList; 

		return ( 
			<div> 
				<h1>Color Palette Generator</h1> 
				<div className="search-container"> 
					<input 
						type="text"
						className="search-input"
						placeholder="Search for a color"
						value={this.state.searchInput} 
						onChange={this.handleSearchChange} 
					/> 
				</div> 

				{/* Render matching colors */} 
				<ul className="container"> 
					{filteredColorList.map((hexValue, index) => ( 
						<li 
							className="color"
							key={index} 
							onClick={() => 
								this.copyColorToClipboard(hexValue, index) 
							} 
						> 
							<div 
								className="rect-box"
								style={{ background: hexValue }} 
							></div> 
							<span className="hex-value"> 
								{hexValue} 
								{this.state.copiedColorIndex === index && ( 
									<p className="copied-message">Copied</p> 
								)} 
							</span> 
						</li> 
					))} 
				</ul> 

				<button 
					className="refresh-btn"
					onClick={this.generateColorPalette} 
				> 
					Refresh Palette 
				</button> 
			</div> 
		); 
	} 
} 

export default App;
