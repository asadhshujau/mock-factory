# shujau-mock-factory

A flexible and powerful fake data generator built on top of Faker.js.

## Installation

Using npm:
```bash
npm install shujau-mock-factory
```

Using yarn:
```bash
yarn add shujau-mock-factory
```

## Usage

```javascript
import factory from 'shujau-mock-factory';

// Generate fake data
const users = factory({
  id: 'uuid',
  name: 'fullName',
  email: 'email',
  age: { type: 'number', options: { min: 18, max: 65 } }
}, 2);

console.log(users);
```

## Features

- Flexible schema definition
- Supports nested objects and arrays
- Custom generator functions
- Built on Faker.js for a wide range of data types

## Schema Definition

### Simple Array
```javascript
const schema = ['id', 'name', 'email'];
```

### Object with Types
```javascript
const schema = {
  id: 'uuid',
  name: 'fullName',
  email: 'email'
};
```

### Complex Object
```javascript
const schema = {
  id: 'uuid',
  name: 'fullName',
  email: 'email',
  age: { type: 'number', options: { min: 18, max: 65 } },
  address: {
    type: {
      street: 'street',
      city: 'city',
      country: 'country'
    }
  },
  tags: { type: ['word'], length: 3 }
};
```

### Custom Generators
```javascript
const schema = {
  id: 'uuid',
  name: 'fullName',
  customField: () => 'Custom Value'
};
```

## API

### factory(schema, quantity = 1)

- `schema`: Object or Array defining the structure of the data to generate
- `quantity`: Number of objects to generate (default: 1)

Returns an array of generated objects based on the schema.

## Supported Types

- Basic: string, number, boolean
- Person: firstName, lastName, fullName, gender, age
- Contact: email, phone
- Internet: username, password, url, avatar
- Address: address, street, city, state, country, zipCode, latitude, longitude
- Company: company, companySuffix, jobTitle
- Finance: creditCard, creditCardCVV, iban, bic, bitcoinAddress
- Content: paragraph, sentence, word
- Date/Time: past, future, recent, month, weekday
- Identifiers: uuid
- Miscellaneous: color

## Testing

This package uses Jest for testing. To run the tests:

#### Install dependencies:

```bash
npm install
```
**or**
```bash
yarn
```

#### Run tests:

```bash
npm test
```
**or**
```bash
yarn test
```

#### To run tests in watch mode:

```bash
npm run test:watch
```
**or**
```bash
yarn test:watch
```

The test suite covers various aspects of the shujau-mock-factory, including:
- Simple array schemas
- Object schemas with explicit types
- Nested objects
- Array generation
- Custom generator functions
- Multiple object generation

If you're contributing to this project, please ensure that your changes are covered by tests.

## License

MIT
