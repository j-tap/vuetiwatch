type Plain = Record<string, any>

const isPlainObject = (value: unknown): value is Plain =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

/**
 * Recursively merges `source` onto `target` without mutating either.
 * Arrays and primitives from `source` replace the target value outright.
 */
export function mergeDeep<T extends Plain> (target: T, source?: Plain): T {
  if (!source) return { ...target }

  const out: Plain = { ...target }

  for (const key of Object.keys(source)) {
    const a = out[key]
    const b = source[key]

    out[key] = isPlainObject(a) && isPlainObject(b) ? mergeDeep(a, b) : b
  }

  return out as T
}
