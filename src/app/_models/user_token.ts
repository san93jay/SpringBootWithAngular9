export class UserTokenDTO {
    userName: String;
    userRole: String;
    accessToken: String;
    type: String;
    name: String;
    constructor() { }

    stringifyData() {
        return JSON.stringify(this);
    }

}