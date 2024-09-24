![CI](https://github.com/asadhshujau/mock-factory/workflows/CI/badge.svg)

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

Basic usage:

```javascript
import factory from 'shujau-mock-factory';

// Generate fake data
const users = factory({
  id: 'uniqueInt',
  name: 'fullName',
  email: 'email',
  age: { type: 'number', options: { min: 18, max: 65 } }
}, 2);

console.log(users);
```

Advanced usage:
```javascript
import { factory, typeGenerators, resetUniqueIntCounter, setUniqueIntStart } from 'faker-factory';

// start uniqueInt count from 10
setUniqueIntStart(10)

// Use factory as before
const users = factory({ ... }, 2);

// Reset unique integer counter
resetUniqueIntCounter();

// Access type generators directly
const randomName = typeGenerators.fullName();
```

## Features

- Flexible schema definition
- Supports nested objects and arrays
- Custom generator functions
- Built on Faker.js for a wide range of data types
- Set a seed to generate consistent data across multiple runs
- Custom type definitions
- Schema inference

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
  id: 'uniqueInt',
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

## Seeding

You can now set a seed to generate consistent data across multiple runs:

```javascript
import { factory, setSeed } from 'shujau-mock-factory';

// Set a seed
setSeed(123);

// Generate data
const users = factory({
  id: 'uniqueInt',
  name: 'fullName',
  email: 'email'
}, 2);

// This will generate the same data every time with the same seed
console.log(users);
```

## Custom Type Definitions

You can now define your own custom types using the `defineType` function:

```javascript
import { factory, defineType } from 'shujau-mock-factory';

// Define a custom type
defineType('customEmail', () => `user_${Math.random().toString(36).substr(2, 5)}@example.com`);

// Use the custom type in a schema
const users = factory({
  id: 'uniqueInt',
  email: 'customEmail',
  name: 'fullName'
}, 2);

console.log(users);
```

This allows you to create types specific to your use case or domain, enhancing the flexibility of the mock factory.

## Schema Inference

You can now generate mock data based on a sample of your actual data structure using the `factoryFromSample` function:

```javascript
import { factoryFromSample } from 'shujau-mock-factory';

const sampleData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  isActive: true,
  tags: ["user", "customer"],
  address: {
    street: "123 Main St",
    city: "Anytown",
    zipCode: "12345"
  }
};

const mockData = factoryFromSample(sampleData, 3);
console.log(mockData);
```

The `factoryFromSample` function will infer the schema from the sample data and generate appropriate mock data. It supports nested object structures, allowing you to create complex mock data easily.

## Testing

This package uses Jest for testing. To run the tests:

#### Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

#### Run tests:

```bash
npm test
```

or

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
- Custom type definitions
- Schema Inference

If you're contributing to this project, please ensure that your changes are covered by tests.

## License

MIT
