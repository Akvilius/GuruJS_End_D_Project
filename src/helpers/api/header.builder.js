import { faker } from '@faker-js/faker';

export class HeaderBuilder {
    constructor() {
        this.header = {};
    }
   
    addToken(token) {
        this.header['x-challenger'] = token;
        return this;
    }
    addAccept(accept) {
        this.header['Accept'] = accept;
        return this;
    }
    addUserAgent(userAgent) {
        this.header['User-Agent'] = userAgent;
        return this;
    }
    addContent(contentType) {
        this.header['Content-Type'] = contentType;
        return this;
    }
    addHttpMethod(method) {
        this.header['X-HTTP-Method-Override'] = method;
        return this;
    }
    addAuth(auth) {
        this.header['Authorization'] = auth;
        return this;
    }
    addXAuth(xAuth) {
        this.header['x-auth-token'] = xAuth;
        return this;
    }

    genereteHeader(){
        return this.header;
    }
}
/*

const header = {
            'x-challenger': token,
        };

constructor() {
    this.headers = {}; // Хранит только те свойства, которые были добавлены
}

addToken() {
    this.headers['x-challenger'] = token;
    return this;
}
addAccept(accept) {
    this.headers['Accept'] = accept;
    return this;
}
addUserAgent(userAgent) {
    this.headers['User-Agent'] = userAgent;
    return this;
}
addContent(contentType) {
    this.headers['Content-Type'] = contentType;
    return this;
}
addHttpMethod(text) {
    this.headers['X-HTTP-Method-Override'] = text;
    return this;
}
addAuth(text) {
    this.headers['Authorization'] = text;
    return this;
}
generate() {
    return this.headers;
}
*/