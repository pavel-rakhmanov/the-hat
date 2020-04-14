import { BaseUser } from '@/types';
import { RestEndpoints } from '@/enums';
import { client } from '@/api';

export async function signIn(userId: BaseUser['id']) {
  const response = await client.get<BaseUser>(`${RestEndpoints.SignIn}/?userId=${userId}`);

  return response;
};
