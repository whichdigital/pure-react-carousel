/**
 * Custom object merging utility to replace deepmerge library
 * This implementation avoids circular reference issues with React 19
 */

/**
 * Check if a value is a plain object (not array, function, null, etc.)
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  // Check for array
  if (Array.isArray(obj)) {
    return false;
  }
  
  // Check for built-in objects like Date, RegExp, etc.
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return false;
  }
  
  return true;
}

/**
 * Check if an object has circular references
 */
function hasCircularReference(obj, seen = new WeakSet()) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  if (seen.has(obj)) {
    return true;
  }
  
  seen.add(obj);
  
  try {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (hasCircularReference(obj[key], seen)) {
          return true;
        }
      }
    }
  } catch (e) {
    // If we can't iterate, assume it's safe
    return false;
  }
  
  seen.delete(obj);
  return false;
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object to merge into
 * @param {Object} source - Source object to merge from
 * @param {Object} options - Merge options
 * @returns {Object} - New merged object
 */
function deepMerge(target, source, options = {}) {
  // Handle null/undefined cases
  if (target === null || target === undefined) {
    target = {};
  }
  if (source === null || source === undefined) {
    return target;
  }
  
  // Handle non-object cases
  if (!isPlainObject(target)) {
    target = {};
  }
  if (!isPlainObject(source)) {
    return target;
  }
  
  // Check for circular references in source
  if (hasCircularReference(source)) {
    console.warn('objectMerge: Circular reference detected in source object, performing shallow merge');
    return { ...target, ...source };
  }
  
  // Create result object
  const result = { ...target };
  
  // Merge properties from source
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      
      // If both values are plain objects, merge recursively
      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        result[key] = deepMerge(targetValue, sourceValue, options);
      }
      // If source value is an array, handle array merging
      else if (Array.isArray(sourceValue)) {
        if (options.mergeArrays && Array.isArray(targetValue)) {
          result[key] = [...targetValue, ...sourceValue];
        } else {
          result[key] = [...sourceValue]; // Clone the array
        }
      }
      // Otherwise, use source value (overwrite)
      else {
        result[key] = sourceValue;
      }
    }
  }
  
  return result;
}

/**
 * Create a deep clone of an object (safe for React objects)
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
function deepClone(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (!isPlainObject(obj)) {
    return obj;
  }
  
  // Check for circular references
  if (hasCircularReference(obj)) {
    console.warn('objectMerge: Circular reference detected, performing shallow clone');
    return { ...obj };
  }
  
  return deepMerge({}, obj);
}

export { deepMerge, deepClone, isPlainObject };
export default deepMerge;