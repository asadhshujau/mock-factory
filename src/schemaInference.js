import typeGenerators from './typeGenerators.js'

const inferType = (key, value) => {
    // Check if the key matches a known type
    if (typeGenerators[key]) {
        return key
    }

    // Infer type based on value
    if (typeof value === 'number') return 'number'
    if (typeof value === 'boolean') return 'boolean'
    if (typeof value === 'string') {
        if (value.includes('@')) return 'email'
        if (value.match(/^[0-9]{5}(-[0-9]{4})?$/)) return 'zipCode'
        if (value.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/)) return 'fullName'
        return 'string'
    }
    if (Array.isArray(value)) return { type: [inferType('', value[0])], length: value.length }
    if (typeof value === 'object' && value !== null) return { type: inferSchema(value) }

    return 'string' // default fallback

}

export const inferSchema = (sampleData) => {
    const schema = {}
    for (const [key, value] of Object.entries(sampleData)) {
        schema[key] = inferType(key, value)
    }
    return schema
}
