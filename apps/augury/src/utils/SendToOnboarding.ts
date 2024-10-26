import axios from 'axios';

export async function sendToOnboarding(atomValue: string) {
  const response = await axios.post(
    'http://localhost:3333/user/onboard',
    atomValue,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  //console.log('Response from backend:', response.data);
}
/*export async function sendToBackend(atomValue: any) {
  console.log(atomValue);
}*/

export async function getUserId() {
  try {
    const response = await axios.get('http://localhost:3333/user/current', {
      withCredentials: true,
    });
    const id = response.data.user.id;
    return id;
  } catch (err) {
    console.log(err);
  }
}
