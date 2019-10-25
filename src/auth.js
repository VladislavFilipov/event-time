class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(token, name, cb) {
        this.authenticated = true;
        // localStorage.setItem('authenticated', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.removeItem('token');
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
