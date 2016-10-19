module.exports={
	src :  {
		style: ['src/styles/main.scss'],
		scripts: ['src/scripts/main.js'],
		html : ['src/html/**/*.html'],
		copy : [
			"src/images/*",
			"src/fonts/*"
		]
	},
	dist  :  {
		style: {
			path: "dist/styles",
			name: "main.css"	
		},
		scripts: {
			path: "dist/scripts",
			name: "main.js"	
		},
		copy : [
			"dist/images/",
			"dist/fonts/"
		],
		html: 'dist/'
	},
	watch: {
		style: 'src/styles/**/*.scss',
		scripts: 'src/scripts/**/*.js',
		html: 'src/html/**/*.html'
	}
}