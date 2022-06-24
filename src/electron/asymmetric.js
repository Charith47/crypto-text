import { generateKeyPair, publicEncrypt, privateDecrypt, createPublicKey } from 'crypto';

export const genKeyPair = () => {
	return new Promise((resolve, reject) => {
		try {
			generateKeyPair(
				'rsa',
				{
					modulusLength: 4096,
					publicKeyEncoding: {
						type: 'spki',
						format: 'pem',
					},
					privateKeyEncoding: {
						type: 'pkcs8',
						format: 'pem',
					},
				},
				(err, publicKey, privateKey) => {
					if (err) throw err;
					resolve({ pub: publicKey, pri: privateKey });
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};

export const encryptAsymmetric = (message, pubkey) => {
	return new Promise((resolve, reject) => {
		try {
			const encryptedData = publicEncrypt(pubkey, Buffer.from(message));
			resolve(encryptedData.toString('hex'));
		} catch (err) {
			reject(err);
		}
	});
};

export const decryptAsymmetric = (cipertext, privkey) => {
	return new Promise((resolve, reject) => {
		try {
			const decryptedData = privateDecrypt(privkey, Buffer.from(cipertext, 'hex'));
			resolve(decryptedData.toString());
		} catch (err) {
			reject(err);
		}
	});
};
