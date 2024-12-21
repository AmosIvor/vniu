import { postRequest } from '@/lib/fetch';

export default async function apiAuthSignIn(
  credentials: Record<'email' | 'password', string>
) {
  console.log(
    '🚀 ~ file: auth.ts ~ line 1 ~ apiAuthSignIn ~ credentials',
    credentials
  );
  try {
    const response = await postRequest({
      endPoint: '/api/v1/auths/login',
      formData: {
        email: credentials.email,
        password: credentials.password,
      },
      isFormData: false,
    });
    console.log('🚀 ~ response:', response.data);

    //if 401 unauthorized

    // const { data, message } = response;
    // console.log('🚀 ~ responseData:', data);

    // if (message !== 'Login Successfully') {
    //   console.log('Invalid credentials');
    //   return { error: 'Invalid credentials' };
    // }
    // const user = data.user;
    // console.log('🚀 ~ user:', user);
    // const userID = data.user.id;
    // return data.data;
    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
}
