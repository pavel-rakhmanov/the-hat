import { defineComponent, createElement } from '@vue/composition-api';

import './Loader.scss';

export default defineComponent({
  name: 'Loader',
  setup: () => {
    const h = createElement;

    return () => (
      <div class="loader mx-auto mr-auto">
        {
          [1,2,3].map(() => <div class="primary"></div>)
        }
      </div>
    )
  }
})
