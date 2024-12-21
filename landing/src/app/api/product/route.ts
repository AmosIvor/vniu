import axios from 'axios';

export async function GET() {
  const response = await axios.get(`http://localhost:5000/api/Product`, {
    headers: {
      Accept: 'application/json',
      setAccept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
    params: {
      page: 1,
      pageSize: 4,
    },
  });

  return new Response(
    JSON.stringify({
      items: 4,
    }),
    { status: 200 }
  );
}
