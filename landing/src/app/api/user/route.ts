
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId)
    return new Response(JSON.stringify('User not found'), { status: 403 });
  // const userDetail = await prisma.user.findUnique({
  //   where: {
  //     id: parseInt(userId),
  //   },
  //   include: {
  //     addresses: true,
  //   },
  // });
  const userDetail = {
    id: -1,
    name: '',
    email: '',
    role: '',
    avatar: '',
    isEmailVerified: false,
  };
  if (!userDetail) return new Response(JSON.stringify({}), { status: 404 });
  return new Response(JSON.stringify(userDetail), { status: 200 });
}
