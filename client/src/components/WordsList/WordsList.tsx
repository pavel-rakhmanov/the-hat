import { defineComponent, createElement, PropType, computed, ref } from '@vue/composition-api';

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
  setup: (props, context) => {
    const h = createElement;
    const word = ref('');
    const words = computed(() => props.words);

    function addWord (w: string) {
      w.trim().toLowerCase();

      if (!w) return;

      const set = new Set([...words.value, w]);

      word.value = '';

      emitWords(Array.from(set.values()));
    }

    function removeWord (word: string) {
      emitWords(words.value.filter(w => w !== word));
    }

    function emitWords (words: string[]) {
      context.emit('change', words);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        addWord(word.value);
      }
    }

    return () => (
      <div class="words-list shadow pa-3 overflow-auto">
        <div class="mb-3">Your words: </div>
        <div class="d-flex">
          <input
            type="text"
            value={word.value}
            onInput={(e: InputEvent) => { if (e.target) { word.value = (e.target as HTMLTextAreaElement).value } }}
            label="new word"
            class="mb-3 mr-3"
            style="width: 100%; border: 1px solid;"
            onKeydown={handleKeyDown}
          />
          <div onClick={() => { addWord(word.value) }}>
            <Icon name="add"/>
          </div>
        </div>
        {
          words.value.map(word => (
            <div class="d-flex justify-space-between">
              <div>{ word }</div>
              <div onClick={() => { removeWord(word) }}>
                <Icon name="delete_forever"/>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
})
