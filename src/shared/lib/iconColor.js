export function iconColor(Icon) {
  return typeof Icon?.displayName === 'string' && Icon.displayName.length > 0 ? 'currentColor' : 'default'
}
