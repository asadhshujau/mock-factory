/**
 * @module index
 * @description Main entry point for the shujau-mock-factory package
 */

import factory, { defineType, factoryFromSample, normalizeSchema, setSeed } from './factory.js'
import { inferSchema } from './schemaInference.js'
import typeGenerators, { resetUniqueIntCounter, setUniqueIntStart } from './typeGenerators.js'

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
