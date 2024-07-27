const fs     = require ('fs')
const PasswordShaker = require ('./PasswordShaker')

module.exports = class extends PasswordShaker {

	constructor (o) {

		super (o)
	
		this.path = o.path

	}
	
	get pepper () {
	
		return fs.readFileSync (this.path)

	}
	
}