/**
 * @module typeGenerators
 * @description Provides generator functions for various data types
 */

import { faker } from "@faker-js/faker"

let uniqueIntCounter = 0

const getUniqueInt = () => {
  return ++uniqueIntCounter
}

export const resetUniqueIntCounter = () => {
  uniqueIntCounter = 0
}

export const setUniqueIntStart = (startValue) => {
  uniqueIntCounter = startValue
}

export const setSeed = (seed) => {
  faker.seed(seed)
  resetUniqueIntCounter()
}

/**
 * Object containing generator functions for various data types
 * @type {Object.<string, function(*=): *>}
 */
export const typeGenerators = {
  // Basic types
  string: () => faker.lorem.word(),
  id: () => getUniqueInt(),
  uniqueInt: () => getUniqueInt(),
  number: () => faker.number.int({ min: 1, max: 1000 }),
  boolean: () => faker.datatype.boolean(),

  // Person-related
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  name: () => faker.person.fullName(),
  fullName: () => faker.person.fullName(),
  gender: () => faker.person.sex(),
  age: () => faker.number.int({ min: 18, max: 80 }),

  // Contact information
  email: () => faker.internet.email(),
  mobile: () => faker.phone.number(),
  phone: () => faker.phone.number(),

  // Internet-related
  username: () => faker.internet.userName(),
  password: () => faker.internet.password(),
  url: () => faker.internet.url(),
  avatar: () => faker.image.avatar(),

  // Address-related
  address: () => faker.location.streetAddress(),
  street: () => faker.location.street(),
  city: () => faker.location.city(),
  state: () => faker.location.state(),
  country: () => faker.location.country(),
  zipCode: () => faker.location.zipCode(),
  latitude: () => faker.location.latitude(),
  longitude: () => faker.location.longitude(),

  // Company-related
  company: () => faker.company.name(),
  companySuffix: () => faker.company.companySuffix(),
  jobTitle: () => faker.person.jobTitle(),

  // Finance-related
  creditCard: () => faker.finance.creditCardNumber(),
  creditCardCVV: () => faker.finance.creditCardCVV(),
  iban: () => faker.finance.iban(),
  bic: () => faker.finance.bic(),
  bitcoinAddress: () => faker.finance.bitcoinAddress(),

  // Content-related
  description: () => faker.lorem.paragraph(),
  paragraph: () => faker.lorem.paragraph(),
  sentence: () => faker.lorem.sentence(),
  word: () => faker.lorem.word(),

  // Date and time
  dob: () => faker.date.past(),
  date_of_birth: () => faker.date.past(),
  birth_date: () => faker.date.past(),
  date: () => faker.date.past(),
  datetime: () => faker.date.past(),
  past: () => faker.date.past(),
  future: () => faker.date.future(),
  recent: () => faker.date.recent(),
  month: () => faker.date.month(),
  weekday: () => faker.date.weekday(),

  // Identifiers
  uuid: () => faker.string.uuid(),

  // Miscellaneous
  color: () => faker.color.human(),

  // Fallback for unsupported types
  default: () => faker.lorem.word(),
}

/**
 * Defines a new custom type generator
 * @param {string} name - The name of the new type
 * @param {Function} generator - The generator function for the new type
 * @throws {Error} If the generator is not a function
 */
export const defineType = (name, generator) => {
  if (typeof generator !== 'function') {
    throw new Error('Generator must be a function')
  }
  typeGenerators[name] = generator
}

export default typeGenerators
