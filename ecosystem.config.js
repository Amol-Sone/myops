module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [

		// First application
		{
			name: "myops",
			script: "keystone.js",
			env: {
				COMMON_VARIABLE: "true"
			},
			env_production: {
				NODE_ENV: "production"
			}
		}
	],

	/**
	 * Deployment section
	 * http://pm2.keymetrics.io/docs/usage/deployment/
	 */
	deploy: {
		production: {
			user: "opper",
			host: "162.243.172.195",
			ref: "origin/master",
			repo: "https://github.com/jpagnano/myops.git",
			path: "/home/opper/www/myops.me",
			"post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production"
		},
		dev: {
			user: "opper",
			host: "162.243.172.195",
			ref: "origin/master",
			repo: "https://github.com/jpagnano/myops.git",
			path: "/home/opper/www/myops.me",
			"post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env dev",
			env: {
				NODE_ENV: "dev"
			},
		}
	}
}
