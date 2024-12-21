export function isFullFilled(data: Record<string, any>): boolean {
  for (const key in data) {
    const value = data[key]
    if (Array.isArray(value)) {
      if (value.length === 0 || value.some((item) => !item || Object.keys(item).length === 0)) {
        return false
      }
    } else if (value === null || value === undefined || value === '') {
      return false
    }
  }
  return true
}
