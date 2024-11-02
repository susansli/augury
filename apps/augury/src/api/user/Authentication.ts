function getGoogleAuthUrl(): string | null {
  try {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
      redirect_uri: 'http://localhost:3333/google/callback',
      client_id:
        '606046863832-jlr48neufqk7nkah0vim93lgqmsnq56f.apps.googleusercontent.com',
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  } catch (err) {
    return null;
  }
}

async function applyUserDefaults(): Promise<boolean> {
  try {

    return true;
  } catch (err) {
    return false;
  }
}

const Authentication = {
  getGoogleAuthUrl,
};

export default Authentication;
