const crypto = require ('crypto')

module.exports = class {

	constructor (o) {
	
		this.order     = o.order     || ['pepper', 'salt', 'pwd']

		this.algorithm = o.algorithm || 'sha256'

		this.encoding  = o.encoding  || 'hex'

	}
	
	sprinkle (amount) {
	
		const buf = Buffer.alloc (amount)

		return crypto.randomFillSync (buf).toString (this.encoding)

	}
		
	cook (pwd, salt) {

		const hash = crypto.createHash (this.algorithm)

		const o = {salt, pwd}; if ('pepper' in this) o.pepper = this.pepper

		for (const k of this.order) {

			const v = o [k]; if (!v) throw Error (k + ' is not defined')

			hash.update (o [k])

		}

		return hash.digest (this.encoding)

	}

	test (hash, raw, salt) {

		const bin = s => Buffer.from (s, this.encoding)

		return crypto.timingSafeEqual (
			bin (hash), 
			bin (this.cook (raw, salt))
		)
	
	}

}