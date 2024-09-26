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
 * @param {Array|Object} schemaOrSample - The schema defining the structure of the data to generate
 * @param {number} [quantity=1] - The number of data objects to generate
 * @param {Object} [cache={}] - Cache of generator functions (usually for internal use)
 * @returns {Array<Object>} An array of generated data objects
 */
export const factory = (schemaOrSample, options = {}) => {
    // Check if options is a number and convert to object if so
    if (typeof options === 'number') {
        return factory(schemaOrSample, { quantity: options })
    }

    const {
        quantity = 1,
        cache = {},
        seed,
        isSample = false
    } = options

    if (seed !== undefined) {
        setSeed(seed)
    }

    let schema
    if (isSample) {
        schema = inferSchema(schemaOrSample)
    } else if (typeof schemaOrSample === 'object' && !Array.isArray(schemaOrSample)) {
        // Check if it's an explicit schema or if we need to infer
        const isExplicitSchema = Object.values(schemaOrSample).some(value =>
            typeof value === 'string' || value === 'uuid' || value === 'number' || typeof value === 'function' || (value && value.type)
        );
        schema = isExplicitSchema ? schemaOrSample : inferSchema(schemaOrSample);
    } else {
        schema = schemaOrSample
    }

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
 * @deprecated Use factory() with isSample option instead. This function will be removed in the next major version.
 *
 * Generates fake data based on a sample data object
 * @param {Object} sampleData - A sample data object to infer the schema from
 * @param {number} [quantity=1] - The number of data objects to generate
 * @param {Object} [cache={}] - Cache of generator functions (usually for internal use)
 * @returns {Array<Object>} An array of generated data objects
 */
export const factoryFromSample = (sampleData, quantity = 1, cache = {}) => {
    console.warn('Warning: factoryFromSample() is deprecated. Use factory() with isSample option instead.');
    return factory(sampleData, { quantity, cache, isSample: true });
}

export { defineType, setSeed }

export default factory
