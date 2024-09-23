import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Goodbye world!</h1>
      <p>
        <i>{JSON.stringify(error)}</i>
      </p>
    </div>
  );
}
