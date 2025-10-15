// app/lib/utils/toPascal.js

// Converts object keys to PascalCase
export function toPascal(obj) {
  if (!obj || typeof obj !== "object") return obj;

  const result = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      result[pascalKey] = obj[key];
    }
  }
  return result;
}
