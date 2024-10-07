import getGoogleOauthUrl from '../utils/getGoogleUrl';

export default function Login(): JSX.Element {

  return (
    <>
      <a href={getGoogleOauthUrl()}>LOG IN</a>
    </>
  );
}
