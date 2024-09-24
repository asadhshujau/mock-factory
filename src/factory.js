/**
 * @module factory
 * @description Provides factory functions for generating mock data
 */

import { inferSchema } from './schemaInference.js'
import typeGenerators, { defineType, setSeed } from './typeGenerators.js'

/**
 * Creates a generator function for the given type and options
 * @param {string|Function} type - The type of data to generate or a custom generator function
 * @param {Object} [options] - Options to pass to the generator
 * @returns {Function} A generator function
 */
const createGenerator = (type, options) => {
    if (typeof type === 'function') return type
    const generator = typeGenerators[type] || typeGenerators.default
    return options ? () => generator(options) : generator
}

/**
 * Normalizes the schema to a consistent format
 * @param {Array|Object} schema - The schema to normalize
 * @returns {Object} The normalized schema
 */
export const normalizeSchema = (schema) => {
    if (Array.isArray(schema)) {
        return Object.fromEntries(schema.map(key => [key, { type: key }]))
    }
    return Object.fromEntries(
        Object.entries(schema).map(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'function') {
                return [key, { type: value }]
            }
            if (value === true) {
                return [key, { type: key }]
            }
            if (Array.isArray(value)) {
                return [key, { type: value, length: value.length }]
            }
            return [key, value]
        })
    )
}

/**
 * Generates a value based on the field definition
 * @param {Object} field - The field definition
 * @param {Object} cache - Cache of generator functions
 * @returns {*} The generated value
 */
const generateValue = (field, cache) => {
    if (Array.isArray(field.type)) {
        return Array.from({ length: field.length || 1 }, () =>
            generateValue({ type: field.type[0], options: field.options }, cache)
        )
    }
    if (typeof field.type === 'object') {
        return factory(field.type, 1, cache)[0]
    }
    if (!cache[field.type]) {
        cache[field.type] = createGenerator(field.type, field.options)
    }
    return cache[field.type]()
}

/**
 * Generates fake data based on the provided schema
 * @param {Array|Object} schema - The schema defining the structure of the data to generate
 * @param {number} [quantity=1] - The number of data objects to generate
 * @param {Object} [cache={}] - Cache of generator functions (usually for internal use)
 * @returns {Array<Object>} An array of generated data objects
 */
export const factory = (schema, quantity = 1, cache = {}) => {
    const normalizedSchema = normalizeSchema(schema)

    return Array.from({ length: quantity }, () =>
        Object.fromEntries(
            Object.entries(normalizedSchema).map(([key, field]) => [
                key,
                generateValue(field, cache)
            ])
        )
    )
}

/**
 * Generates fake data based on a sample data object
 * @param {Object} sampleData - A sample data object to infer the schema from
 * @param {number} [quantity=1] - The number of data objects to generate
 * @param {Object} [cache={}] - Cache of generator functions (usually for internal use)
 * @returns {Array<Object>} An array of generated data objects
 */
export const factoryFromSample = (sampleData, quantity = 1, cache = {}) => {
    const schema = inferSchema(sampleData)
    return factory(schema, quantity, cache)
}

export { defineType, setSeed }

export default factory
