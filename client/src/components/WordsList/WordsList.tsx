import { defineComponent, createElement, PropType } from '@vue/composition-api';

import Icon from '../Icon';

import './WordsList.scss';

export default defineComponent({
  name: 'WordsList',
  props: {
    words: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup: (props) => {
    const h = createElement;

    return () => (
      <div class="words-list shadow pa-3  overflow-auto">
        <div>Words: </div>
        <input label="new word" />
        {
          props.words.map(word => (
            <div class="d-flex justify-space-between">
              <div>{ word }</div>
              <Icon name="delete_forever"/>
            </div>
          ))
        }
      </div>
    )
  }
})
