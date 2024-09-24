import factory, { normalizeSchema, setSeed, defineType, factoryFromSample } from './factory.js'
import { inferSchema } from './schemaInference.js'
import typeGenerators, { resetUniqueIntCounter, setUniqueIntStart } from './typeGenerators.js'

export {
    factory,
    factoryFromSample,
    normalizeSchema,
    typeGenerators,
    resetUniqueIntCounter,
    setUniqueIntStart,
    setSeed,
    defineType,
    inferSchema
}

export default factory
