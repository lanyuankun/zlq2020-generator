const Generator = require('yeoman-generator')
const fs = require('fs')

module.exports = class extends Generator {
	prompting() {
		return this.prompt([{
				type: "input",
				name: 'name',
				message: 'your project name',
				default: this.appname
			}])
			.then(answers => this.answers = answers)
	}
	writing() {
		var dirs = [];
		var dirpath = __dirname + '\\templates';

		function getFileName(path) {
			try {
				var readDir = fs.readdirSync(path);
				for (var i = 0; i < readDir.length; i++) {
					var stat = fs.statSync(path + '\\' + readDir[i]);
					if (stat.isFile()) {
						dirs.push(path + '\\' + readDir[i]);
					} else {
						getFileName(path + '\\' + readDir[i])
					}
				}
			} catch (e) {
				console.log(e)
			}
		}
		getFileName(dirpath);
		var context = this.answers;
		for (var i = 0; i < dirs.length; i++) {
			var outpath = dirs[i].replace(dirpath, this.destinationPath())
			this.fs.copyTpl(dirs[i], outpath, context)
		}

	}
}
