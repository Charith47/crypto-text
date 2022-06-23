import { pbkdf2, randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export const keyGen = (password) => {
	// handle if password is empty
	return new Promise((resolve, reject) => {
		const salt = randomBytes(16);
		try {
			pbkdf2(password, salt, 100000, 32, 'sha512', (err, derivedKey) => {
				if (err) throw err;
				resolve(derivedKey.toString('hex'));
			});
		} catch (err) {
			reject(err);
		}
	});
};

const algorithm = 'aes-256-ctr';

export const encrypt = (message, key) => {
	return new Promise((resolve, reject) => {
		const iv = randomBytes(16);
		const cipher = createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);

		try {
			const encryptedData = Buffer.concat([
				cipher.update(message, 'utf-8'),
				cipher.final(),
			]);
			resolve({
				data: `${encryptedData.toString('hex')}:${iv.toString('hex')}`,
			});
			decrypt(`${encryptedData.toString('hex')}:${iv.toString('hex')}`, key);
		} catch (err) {
			reject(err);
		}
	});
};

export const decrypt = (data, key) => {
	return new Promise((resolve, reject) => {
		const [cipherText, iv] = data.split(':');

		const decipher = createDecipheriv(
			algorithm,
			Buffer.from(key, 'hex'),
			Buffer.from(iv, 'hex')
		);
		try {
			const decryptedData = Buffer.concat([
				decipher.update(Buffer.from(cipherText, 'hex')),
				decipher.final(),
			]);
			resolve({ data: decryptedData.toString() });
			//console.log(decryptedData.toString());
		} catch (err) {
			reject(err);
		}
	});
};
