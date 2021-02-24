function makeBasicAuthorizationHeader(username, password) {
    const headerValue = btoa(`Basic ${username}:${password}`);

    return ['Authorization', headerValue];
}
