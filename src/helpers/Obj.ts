export function isEmpty(targetObject: Object) {
  return Object.keys(targetObject).length < 1
}

export function clone(targetObject: Object) {
  return JSON.parse(JSON.stringify(targetObject))
}
