import { BaseUser, BaseRoom,  } from '@/types';
import { RestEndpoints } from '@/enums';
import { client } from '@/api';

export async function leaveRoom(
  input: { userId: BaseUser['id'], roomId: BaseRoom['id'] }
): Promise<Required<BaseUser>> {
  return client.post(RestEndpoints.LeaveRoom, {
    ...input
  });
};
