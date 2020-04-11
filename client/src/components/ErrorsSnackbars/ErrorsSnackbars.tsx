import { defineComponent, createElement, computed } from '@vue/composition-api';
import { VIcon } from 'vuetify/lib'
import { ErrorsStore } from '@/store';

import './ErrorsSnackbars.scss';

const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production';

export default defineComponent({
  name: 'ErrorsSnackbars',
  setup: () => {
    const h = createElement;
    const errors = computed(() => ErrorsStore.errors);

    return () => (
      <div class="errors">
        {
          errors.value.map(error => (
            <div class="errors__error secondary">
              <pre class="errors__error-content">
                <div class="d-flex align-center">
                <div class="primary--text mr-auto">
                  { error.message }
                </div>
                <a
                  class="pa-2"
                  onClick={() => { ErrorsStore.deleteError(error.id)}}>
                  [X]
                </a>
                </div>
                {
                  !IS_PRODUCTION_MODE && <pre class="white--text">
                    { JSON.stringify(JSON.parse(String(error.raw)), null, 2) }
                  </pre>
                }
              </pre>
            </div>
          ))
        }
      </div>
    )
  }
})
