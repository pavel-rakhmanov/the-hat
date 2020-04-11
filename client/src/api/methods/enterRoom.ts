import { BaseUser, Room as BaseRoom,  } from '../../../../types';
import { RestEndpoints } from '../../../../enums';

import { client } from '@/api/client';

export async function enterRoom(
  input: { userId: BaseUser['id'], roomId: BaseRoom['id'], roomPassword: BaseRoom['password']})
: Promise<Required<BaseUser>> {
  return client.post(RestEndpoints.EnterRoom, {
    ...input
  });
};
