const Path = require ('path')
const {PasswordShakerFile} = require ('..')

const path = Path.join (__dirname, 'data', 'pepper.txt')

test ('basic', () => {

	const pwd = new PasswordShakerFile ({path})
	
	expect (String (pwd.pepper)).toBe ('pepper')

	expect (pwd.test ('c92fda7ed203b63eaaba63bd60ecff0b122085c5a5a184856f542dc6d58ef96f', 'pass', '1234')).toBe (true)

})