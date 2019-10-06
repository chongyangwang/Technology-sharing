const router = require('koa-router')();
const Oauth = require('../controller/index.js');
router.get('/oauth/redirect', async (ctx, next) => {
	var requestCode = ctx.request.query.code;
	var data = await Oauth.getData(requestCode);
	ctx.body = data;
});

module.exports = router;
