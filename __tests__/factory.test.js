import factory, { resetUniqueIntCounter } from '../src/index.js'

describe('mock-factory', () => {
    test('generates data based on simple array schema', () => {
        const schema = ['id', 'name', 'email']
        const result = factory(schema, 1)

        expect(result).toHaveLength(1)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('name')
        expect(result[0]).toHaveProperty('email')
    })

    test('generates data based on object schema with explicit types', () => {
        const schema = {
            id: 'uuid',
            name: 'fullName',
            email: 'email',
            age: 'number'
        }
        const result = factory(schema, 1)

        expect(result).toHaveLength(1)
        expect(result[0]).toHaveProperty('id')
        expect(result[0].id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
        expect(result[0]).toHaveProperty('name')
        expect(typeof result[0].name).toBe('string')
        expect(result[0]).toHaveProperty('email')
        expect(result[0].email).toMatch(/@/)
        expect(result[0]).toHaveProperty('age')
        expect(typeof result[0].age).toBe('number')
    })

    test('generates data with nested objects', () => {
        const schema = {
            id: 'uuid',
            user: {
                type: {
                    name: 'fullName',
                    email: 'email'
                }
            }
        }
        const result = factory(schema, 1)

        expect(result).toHaveLength(1)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('user')
        expect(result[0].user).toHaveProperty('name')
        expect(result[0].user).toHaveProperty('email')
    })

    test('generates data with arrays', () => {
        const schema = {
            id: 'uuid',
            tags: { type: ['word'], length: 3 }
        }
        const result = factory(schema, 1)

        expect(result).toHaveLength(1)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('tags')
        expect(result[0].tags).toHaveLength(3)
        expect(Array.isArray(result[0].tags)).toBe(true)
    })

    test('supports custom generator functions', () => {
        const schema = {
            id: 'uuid',
            customField: () => 'Custom Value'
        }
        const result = factory(schema, 1)

        expect(result).toHaveLength(1)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('customField')
        expect(result[0].customField).toBe('Custom Value')
    })

    test('generates multiple objects when quantity is specified', () => {
        const schema = { id: 'uuid', name: 'fullName' }
        const result = factory(schema, 3)

        expect(result).toHaveLength(3)
        result.forEach(item => {
            expect(item).toHaveProperty('id')
            expect(item).toHaveProperty('name')
        })
    })

    describe('uniqueInt generator', () => {
        beforeEach(() => {
            resetUniqueIntCounter()
        })

        test('generates unique incrementing integers', () => {
            const schema = { id: 'uniqueInt' }
            const result = factory(schema, 3)

            expect(result).toHaveLength(3)
            expect(result[0].id).toBe(1)
            expect(result[1].id).toBe(2)
            expect(result[2].id).toBe(3)
        })

        test('continues incrementing across multiple factory calls', () => {
            const schema = { id: 'uniqueInt' }
            const result1 = factory(schema, 2)
            const result2 = factory(schema, 2)

            expect(result1[0].id).toBe(1)
            expect(result1[1].id).toBe(2)
            expect(result2[0].id).toBe(3)
            expect(result2[1].id).toBe(4)
        })
    })
})
