const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../public'),
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'/requests': {
				target: 'http://localhost:5000'
			}
		}
	}
};
