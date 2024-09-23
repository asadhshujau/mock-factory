import factory, { normalizeSchema, setSeed, defineType } from './factory.js'
import typeGenerators, { resetUniqueIntCounter, setUniqueIntStart } from './typeGenerators.js'

export {
    factory,
    normalizeSchema,
    typeGenerators,
    resetUniqueIntCounter,
    setUniqueIntStart,
    setSeed,
    defineType
}

export default factory
