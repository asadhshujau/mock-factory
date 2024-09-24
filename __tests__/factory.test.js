import factory, { defineType, factoryFromSample, resetUniqueIntCounter, setSeed } from '../src/index.js'

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

    describe('seeding', () => {
        beforeEach(() => {
            resetUniqueIntCounter()
        })

        test('generates consistent data with the same seed', () => {
            const schema = {
                id: 'uniqueInt',
                name: 'fullName',
                email: 'email'
            }

            setSeed(123)
            const result1 = factory(schema, 2)

            setSeed(123)
            const result2 = factory(schema, 2)

            expect(result1).toEqual(result2)
        })

        test('generates different data with different seeds', () => {
            const schema = {
                id: 'uniqueInt',
                name: 'fullName',
                email: 'email'
            }

            setSeed(123)
            const result1 = factory(schema, 1)

            setSeed(456)
            const result2 = factory(schema, 1)

            expect(result1).not.toEqual(result2)
        })
    })

    describe('custom type definitions', () => {
        beforeEach(() => {
            resetUniqueIntCounter()
        })

        test('allows defining and using custom types', () => {
            defineType('customEmail', () => `user_${Math.random().toString(36).substr(2, 5)}@example.com`)

            const schema = {
                id: 'uniqueInt',
                email: 'customEmail'
            }

            const result = factory(schema, 2)

            expect(result).toHaveLength(2)
            expect(result[0]).toHaveProperty('id')
            expect(result[0]).toHaveProperty('email')
            expect(result[0].email).toMatch(/^user_[a-z0-9]{5}@example\.com$/)
            expect(result[1].email).toMatch(/^user_[a-z0-9]{5}@example\.com$/)
            expect(result[0].email).not.toBe(result[1].email)
        })

        test('throws an error when defining a custom type with a non-function generator', () => {
            expect(() => {
                defineType('invalidType', 'not a function')
            }).toThrow('Generator must be a function')
        })
    })

    describe('schema inference', () => {
        test('infers schema from sample data', () => {
            const sampleData = {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                age: 30,
                isActive: true,
                tags: ["user", "customer"]
            }

            const result = factoryFromSample(sampleData, 2)

            expect(result).toHaveLength(2)
            result.forEach(item => {
                expect(item).toHaveProperty('id')
                expect(typeof item.id).toBe('number')
                expect(item).toHaveProperty('name')
                expect(typeof item.name).toBe('string')
                expect(item).toHaveProperty('email')
                expect(item.email).toMatch(/@/)
                expect(item).toHaveProperty('age')
                expect(typeof item.age).toBe('number')
                expect(item).toHaveProperty('isActive')
                expect(typeof item.isActive).toBe('boolean')
                expect(item).toHaveProperty('tags')
                expect(Array.isArray(item.tags)).toBe(true)
            })
        })

        test('infers nested object schema', () => {
            const sampleData = {
                id: 1,
                user: {
                    name: "John Doe",
                    email: "john@example.com"
                }
            }

            const result = factoryFromSample(sampleData, 1)

            expect(result).toHaveLength(1)
            expect(result[0]).toHaveProperty('id')
            expect(typeof result[0].id).toBe('number')
            expect(result[0]).toHaveProperty('user')
            expect(typeof result[0].user).toBe('object')
            expect(result[0].user).toHaveProperty('name')
            expect(typeof result[0].user.name).toBe('string')
            expect(result[0].user).toHaveProperty('email')
            expect(result[0].user.email).toMatch(/@/)
        })

        test('infers date types', () => {
            const sampleData = {
                id: 1,
                name: "John Doe",
                birthDate: "1990-01-01",
                createdAt: "2023-01-01T12:00:00Z",
                lastLogin: new Date()
            }

            const result = factoryFromSample(sampleData, 1)

            expect(result).toHaveLength(1)
            expect(result[0]).toHaveProperty('id')
            expect(typeof result[0].id).toBe('number')
            expect(result[0]).toHaveProperty('name')
            expect(typeof result[0].name).toBe('string')
            expect(result[0]).toHaveProperty('birthDate')
            expect(result[0].birthDate instanceof Date).toBe(true)
            expect(result[0]).toHaveProperty('createdAt')
            expect(result[0].createdAt instanceof Date).toBe(true)
            expect(result[0]).toHaveProperty('lastLogin')
            expect(result[0].lastLogin instanceof Date).toBe(true)
        })

    })

})
