import decode from 'jwt-decode';

class Auth {
    getProfile() {
        return decode(this.getToken());
    }

    isLoggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string): boolean {
        try {
            const decoded: any = decode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    }

    getToken(): any {
        return localStorage.getItem('token-whathappened');
    }

    login(token: string) {
        localStorage.setItem('token-whathappened', token);
    }

    logout() {
        localStorage.removeItem('token-whathappened');
    }
}

export const auth = new Auth();