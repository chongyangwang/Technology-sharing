const axios = require('axios');
module.exports = {
	getAccessToken(code) {
		const clientId = 'cb80c1f3a6af61b6f8f6';
		const clientSecret = '3104a77de24456579449924d00547cbd40a9f34b';
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url:
					'https://github.com/login/oauth/access_token?' +
					`client_id=${clientId}&` +
					`client_secret=${clientSecret}&` +
					`code=${code}`,
				headers: {
					accept: 'application/json',
				},
			}).then(res => {
				console.log(res.data);
				resolve(res);
			});
		});
	},
	getUser(accessToken) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: `https://api.github.com/user?access_token=${accessToken}`,
				headers: {
					accept: 'application/json',
				},
			}).then(res => {
				console.log(res);
				resolve(res.data);
			});
		});
	},
	async getData(code) {
		var access_token_info = await this.getAccessToken(code);
		var access_token = access_token_info.data.access_token;
		var userData = await this.getUser(access_token);
		console.log(userData);
		return userData;
	},
};
