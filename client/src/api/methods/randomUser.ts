import { BaseUser } from '../../../../types';
import { RestEndpoints } from '../../../../enums';

import { client } from '@/api/client';

export async function randomUser(): Promise<Required<BaseUser>> {
  const response = await client.get<Required<BaseUser>>(RestEndpoints.GenerateRandomUser);

  const randomUser = response.data;

  if (!randomUser) throw new Error();

  return randomUser;
};
