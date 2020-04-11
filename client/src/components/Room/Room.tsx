import { defineComponent, createElement, PropType, computed } from '@vue/composition-api';

import { Room as BaseRoom } from '../../../../types';

import User from '../User';
import Icon from '../Icon';

import './Room.scss';

export default defineComponent({
  name: 'room',
  props: {
    room: {
      type: Object as PropType<BaseRoom>,
      required: true
    }
  },
  setup: (props, context ) => {
    const h = createElement;
    const { room } = props;
    const isFull = computed(() => room.users.length >= room.usersLimit );

    function onRoomClick(e: MouseEvent) {
      e.stopPropagation();

      if (!isFull.value) {
        context.emit('click', e);
      };
    }

    return () => (
      <div
        onClick={onRoomClick}
        class={'room shadow'}
      >
        <div class="room__title secondary--text">
          <Icon
            class="mr-3"
            name={room.password ? 'lock' : 'lock_open'}
          />
          <span class="secondary--text mr-3">
            [{ room.users.length }/{ room.usersLimit }]
          </span>
          <span class="mr-auto">
            { room.name }
          </span>
        </div>
        <div class="room__body">
          {
            <div class="room__users">
              {
                (room.users || []).map(user => <User class="user-list__user" user={user} />)
              }
            </div>
          }
        </div>
      </div>
    )
  }
})
