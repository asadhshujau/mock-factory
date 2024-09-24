/**
 * @module schemaInference
 * @description Provides functionality to infer schema from sample data
 */

import typeGenerators from './typeGenerators.js'

/**
 * Checks if a given value is a valid Date object
 * @param {*} date - The value to check
 * @returns {boolean} True if the value is a valid Date, false otherwise
 */
const isValidDate = (date) => date instanceof Date && !isNaN(date);

/**
 * Infers the type of a given value
 * @param {string} key - The key associated with the value
 * @param {*} value - The value to infer the type from
 * @returns {string|Object} The inferred type or a nested schema object
 */
const inferType = (key, value) => {
  // Check if the key matches a known type
  if (typeGenerators[key]) {
    return key;
  }

  // Infer type based on value
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'string') {
    // Date inference
    const dateValue = new Date(value);
    if (isValidDate(dateValue)) {
      if (value.includes('T')) return 'datetime';
      return 'date';
    }
    if (value.includes('@')) return 'email';
    if (value.match(/^[0-9]{5}(-[0-9]{4})?$/)) return 'zipCode';
    if (value.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/)) return 'fullName';
    return 'string';
  }
  if (value instanceof Date) return 'date';
  if (Array.isArray(value)) return { type: [inferType('', value[0])], length: value.length };
  if (typeof value === 'object' && value !== null) return { type: inferSchema(value) };

  return 'string'; // default fallback
}

/**
 * Infers a schema from sample data
 * @param {Object} sampleData - The sample data to infer the schema from
 * @returns {Object} The inferred schema
 */
export const inferSchema = (sampleData) => {
    const schema = {}
    for (const [key, value] of Object.entries(sampleData)) {
        schema[key] = inferType(key, value)
    }
    return schema
}

