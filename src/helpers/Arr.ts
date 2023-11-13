export function isArray(targetObject: unknown) {
  return targetObject instanceof Array
}

export function isEmpty(targetObject: any) {
  // TODO: remove any
  if (!targetObject) {
    return true
  }
  return targetObject.length < 1
}
