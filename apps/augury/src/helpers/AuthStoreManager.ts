function getUrlParams(): URLSearchParams {
  const queryString = window.location.search;
  return new URLSearchParams(queryString);
}

function storeUserId(): boolean {
  const urlParams: URLSearchParams = getUrlParams();
  const userId = urlParams.get('id');
  if (userId) {
    localStorage.setItem('userId', userId);
    return true;
  }
  return false;
}

function getUserId(): string {
  const userId = localStorage.getItem('userId');
  return userId || '';
}

const AuthStoreManager = {
  getUrlParams,
  storeUserId,
  getUserId
};

export default AuthStoreManager;