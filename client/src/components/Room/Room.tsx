import { defineComponent, createElement, PropType, computed } from '@vue/composition-api';

import { BaseRoom } from '@/types';
import User from '@/components/User';
import Icon from '@/components/Icon';

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

    const room = computed(() => props.room);

    function onRoomClick(e: MouseEvent) {
      e.stopPropagation();

      if (room.value.users.length < room.value.usersLimit) {
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
            name={room.value.password ? 'lock' : 'lock_open'}
          />
          <span class="secondary--text mr-3">
            [{ room.value.users.length }/{ room.value.usersLimit }]
          </span>
          <span class="mr-auto">
            { room.value.name }
          </span>
        </div>
        <div class="room__body">
          <div class="room__users">
            {
              room.value.users.map(user => (
                <User class="user-list__user" user={user} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
})
