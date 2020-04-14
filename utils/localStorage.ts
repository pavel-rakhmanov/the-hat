/**
 * This key base will be automatically added to
 * all our data keys for better localStorage organization
 */
const localStorageKeyBase = 'the-hat-'

/**
 * Allows to set or remove data to localStorage.
 * Data will be set if value != undefined and
 * will be removed otherwise
 * @param key data key in localStorage
 * @param value any data. Will still be processed by JSON.stringify()
 */
export const localStorageSet = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  key: string, value: any
): void => {
  const fullKey = localStorageKeyBase + key

  if (value) {
    if (typeof value !== 'string') {
      localStorage.setItem(fullKey, JSON.stringify(value))
    } else {
      localStorage.setItem(fullKey, value)
    }
  } else {
    localStorage.removeItem(fullKey)
  }
}

/**
 * localStorage getter function
 * @param key data key in localStorage
 * @returns Object or string
 */
export const localStorageGet = (key: string) => {
  const fullKey = localStorageKeyBase + key
  const data = String(localStorage.getItem(fullKey))

  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
