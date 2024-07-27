const Path = require ('path')
const {PasswordShaker} = require ('..')

const path = Path.join (__dirname, 'data', 'pepper.txt')

test ('basic', () => {

	const pwd = new PasswordShaker ({order: ['pwd', 'salt']})

	expect (() => pwd.test ('bd94dcda26fccb4e68d6a31f9b5aac0b571ae266d822620e901ef7ebe3a11d4f', 'pass')).toThrow ('salt')

	expect (pwd.test ('bd94dcda26fccb4e68d6a31f9b5aac0b571ae266d822620e901ef7ebe3a11d4f', 'pass', '1234')).toBe (true)

})

test ('sprinkle', () => {

	const pwd = new PasswordShaker ({path})
	
	expect (pwd.sprinkle (10)).toHaveLength (20)

})
