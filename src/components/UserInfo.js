export default class UserInfo {
    constructor(userInfoSelectors, userInfoHandlers) {
        this._selectorUserName = userInfoSelectors.userName;
        this._selectorUserData = userInfoSelectors.userData;
        this._getUserInfo = userInfoHandlers.getUserInfo;
        this._setUserInfo = userInfoHandlers.setUserInfo;
    }

    getUserInfo() {
        return this._getUserInfo();
    }

    setUserInfo(userInfo) {
        this._setUserInfo(userInfo.name, userInfo.about);
        this._selectorUserName.textContent = userInfo.name;
        this._selectorUserData.textContent = userInfo.about;
    }
}