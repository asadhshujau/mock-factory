/**
 * @module index
 * @description Main entry point for the shujau-mock-factory package
 */

import factory, { defineType, normalizeSchema, setSeed } from './factory.js'
import { inferSchema } from './schemaInference.js'
import typeGenerators, { resetUniqueIntCounter, setUniqueIntStart } from './typeGenerators.js'

/**
 * @deprecated Use factory() with isSample option instead. This function will be removed in the next major version.
 */
const factoryFromSample = (sampleData, quantity = 1, cache = {}) => {
    console.warn('Warning: factoryFromSample() is deprecated. Use factory() with isSample option instead.');
    return factory(sampleData, { quantity, cache, isSample: true });
}

export {
    defineType,
    factory,
    factoryFromSample,
    inferSchema,
    normalizeSchema,
    resetUniqueIntCounter,
    setSeed,
    setUniqueIntStart,
    typeGenerators
}

export default factory
