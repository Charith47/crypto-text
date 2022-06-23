import { generateKeyPair } from 'crypto';

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
					console.log(publicKey, privateKey);
					resolve({ pub: publicKey, pri: privateKey });
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};
