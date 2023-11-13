export function isEmpty(targetObject: Object) {
  return Object.keys(targetObject).length < 1
}

export function isObject(targetObject: Object | undefined) {
  return typeof targetObject === 'object'
}

export function clone(targetObject: Object) {
  return JSON.parse(JSON.stringify(targetObject))
}
