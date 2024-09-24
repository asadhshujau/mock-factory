import { inferSchema } from './schemaInference.js'
import typeGenerators, { setSeed, defineType } from './typeGenerators.js'

/**
 * Creates a generator function for the given type and options.
 *
 * @param {string|function} type - The type of data to generate or a custom generator function.
 * @param {Object} [options] - Options to pass to the generator.
 * @returns {function(): *} A generator function.
 */
const createGenerator = (type, options) => {
    if (typeof type === 'function') return type
    const generator = typeGenerators[type] || typeGenerators.default
    return options ? () => generator(options) : generator
}

/**
 * Normalizes the schema to a consistent format.
 *
 * @param {Array|Object} schema - The schema to normalize.
 * @returns {Object} The normalized schema.
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
 * Generates a value based on the field definition.
 *
 * @param {Object} field - The field definition.
 * @param {Object} cache - Cache of generator functions.
 * @returns {*} The generated value.
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
 * Generates fake data based on the provided schema.
 *
 * @param {Array|Object} schema - The schema defining the structure of the data to generate.
 *   Can be:
 *   - An array of field names
 *   - An object with field names and types
 *   - An object with nested structures and options
 * @param {number} [quantity=1] - The number of data objects to generate.
 * @param {Object} [cache={}] - Cache of generator functions (usually for internal use).
 * @returns {Array<Object>} An array of generated data objects.
 *
 * @example
 * // 1. Simple array of field names
 * const simpleUsers = factory(['id', 'name', 'email'], 2);
 *
 * // 2. Object with field names as keys and types as values
 * const typedUsers = factory({
 *   id: 'uuid',
 *   name: 'fullName',
 *   email: 'email',
 *   isActive: 'boolean'
 * }, 2);
 *
 * // 3. Object with true for fields that match their type name
 * const simpleTypedUsers = factory({
 *   id: true, // Will use 'id' type
 *   name: true, // Will use 'name' type
 *   email: true // Will use 'email' type
 * }, 2);
 *
 * // 4. Complex object with nested structures and options
 * const complexUsers = factory({
 *   id: 'uuid',
 *   name: 'fullName',
 *   email: 'email',
 *   age: { type: 'number', options: { min: 18, max: 65 } },
 *   address: {
 *     type: {
 *       street: 'street',
 *       city: 'city',
 *       country: 'country'
 *     }
 *   },
 *   tags: { type: ['word'], length: 3 },
 *   createdAt: 'past'
 * }, 2);
 *
 * // 5. Using custom generator functions
 * const customUsers = factory({
 *   id: 'uuid',
 *   name: 'fullName',
 *   customField: () => 'Custom Value'
 * }, 2);
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

export const factoryFromSample = (sampleData, quantity = 1, cache = {}) => {
    const schema = inferSchema(sampleData)
    return factory(schema, quantity, cache)
}

export { setSeed, defineType }

export default factory
