import { AuthConfig } from '@hilma/auth-nest';

export default (): AuthConfig => ({
	auth: {
        ttl: {
            admin: 3.154e+10
        }
    },

	app_name_he: "פיילסהנדלר",

	roleAccessConfig: {
		CUSTOMER: {
			components: [
				"CustomerHome"
			],
			defaultHomePage: "CustomerHome"
		},
		ADMIN: {
			components: [
				"AdminHome"
			],
			defaultHomePage: "AdminHome"
		}
	}
});