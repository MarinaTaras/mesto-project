export default class UserInfo {
    constructor(userInfoSelectors, userInfoHandlers) {
        this._selectorUserName = userInfoSelectors.userName;
        this._selectorUserData = userInfoSelectors.userData;
        this._selectorUserAvatar = userInfoSelectors.userAvatar;
        this._getUserInfo = userInfoHandlers.getUserInfo;
        this._setUserInfo = userInfoHandlers.setUserInfo;
        this._updateAvatar = userInfoHandlers.updateAvatar;
    }
    getUserInfo() {
        return this._getUserInfo();
    }

    setUserInfo(userInfo) {
        this._setUserInfo(userInfo);
        this._updateAvatar(userInfo);
        this._selectorUserAvatar.src = userInfo.avatar;
        this._selectorUserName.textContent = userInfo.name;
        this._selectorUserData.textContent = userInfo.about;
    }
}