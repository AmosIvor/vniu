import { BadgeProps } from './../components/ui/badge';
export default async function apiAuthSignIn(
  credentials: Record<'email' | 'password', string> | undefined
) {
  console.log(
    '🚀 ~ file: auth.ts ~ line 1 ~ apiAuthSignIn ~ credentials',
    credentials
  );
  try {
    // const backendUrl = process.env.BACKEND_URL;
    // console.log('🚀 ~ backendUrl:', backendUrl);
    const response = await fetch(`http://localhost:5000/api/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
    });

    //if 401 unauthorized

    const { data, message } = await response.json();
    console.log('🚀 ~ responseData:', data);

    if (message !== 'Login Successfully') {
      console.log('Invalid credentials');
      return { error: 'Invalid credentials' };
    }
    const user = data.user;
    console.log('🚀 ~ user:', user);
    const userID = data.user.id;
    // return data.data;
    return { ...user, userID };
  } catch (error) {
    return { error: error.message };
  }
}
