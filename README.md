# shujau-mock-factory

![CI](https://github.com/asadhshujau/mock-factory/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/shujau-mock-factory.svg)](https://badge.fury.io/js/shujau-mock-factory)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and powerful mock data generator built on top of Faker.js, designed to streamline the creation of realistic test data for your JavaScript applications.

## Features

- 🔧 Flexible schema definition
- 🏗 Support for nested objects and arrays
- 🎭 Custom generator functions
- 🌈 Wide range of built-in data types
- 🔢 Consistent data generation with seeding
- 🧩 Custom type definitions
- 🔍 Automatic schema inference from sample data
- ⚙️ Backwards compatibility with previous API

## Installation

Using npm:
```bash
npm install shujau-mock-factory
```

Using yarn:
```bash
yarn add shujau-mock-factory
```

## Quick Start

```javascript
import factory from 'shujau-mock-factory';

const users = factory({
  id: 'uniqueInt',
  name: 'fullName',
  email: 'email',
  age: { type: 'number', options: { min: 18, max: 65 } }
}, { quantity: 2 });

console.log(users);
```

## Usage Tips

### Obtaining a Single Object

The `factory` function always returns an array, even when generating a single item. If you need a single object, you can easily extract it using array destructuring or indexing:

```javascript
// Using array destructuring
const [user] = factory({ name: 'fullName', email: 'email' });

// Or using array indexing
const user = factory({ name: 'fullName', email: 'email' })[0];
```

This design ensures consistency and flexibility in the API, allowing you to always work with the result in the same way, regardless of the quantity generated.

## API Reference

### factory(schemaOrSample, options)

Generates mock data based on the provided schema or sample.

- `schemaOrSample`: Object or Array defining the structure of the data to generate, or a sample object to infer the schema from.
- `options`: Object (optional)
  - `quantity`: Number of objects to generate (default: 1)
  - `seed`: Seed for consistent random generation
  - `isSample`: Boolean indicating if the first argument is a sample object (default: false)
  - `cache`: Object for caching generator functions (advanced usage)

Returns an array of generated objects.

### Defining Schemas

#### Simple Array
```javascript
const schema = ['id', 'name', 'email'];
```

#### Object with Types
```javascript
const schema = {
  id: 'uuid',
  name: 'fullName',
  email: 'email'
};
```

#### Complex Object
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

### Supported Types

- Basic: string, number, boolean, uuid
- Person: firstName, lastName, fullName, gender, age
- Contact: email, phone, mobile
- Internet: username, password, url, avatar
- Address: address, street, city, state, country, zipCode, latitude, longitude
- Company: company, companySuffix, jobTitle
- Finance: creditCard, creditCardCVV, iban, bic, bitcoinAddress
- Content: paragraph, sentence, word, description
- Date/Time: date, datetime, past, future, recent, month, weekday
- Identifiers: uniqueInt
- Miscellaneous: color

### Advanced Usage

#### Seeding for Consistent Data

You can set a seed to generate consistent data across multiple runs. This can be done in two ways:

1. Using the `setSeed` function:

```javascript
import { factory, setSeed } from 'shujau-mock-factory';

setSeed(123);
const users = factory({ name: 'fullName', email: 'email' }, { quantity: 2 });
```

2. Using the `seed` option in the `factory` function (recommended):

```javascript
import { factory } from 'shujau-mock-factory';

const users = factory(
  { name: 'fullName', email: 'email' },
  { quantity: 2, seed: 123 }
);

// This will generate the same data as the previous example
```

Using the `seed` option is recommended as it allows for more localized control over seeding, especially when you need different seeds for different factory calls in the same script.

#### Custom Type Definitions

```javascript
import { factory, defineType } from 'shujau-mock-factory';

defineType('customEmail', () => `user_${Math.random().toString(36).substr(2, 5)}@example.com`);

const users = factory({
  id: 'uniqueInt',
  email: 'customEmail'
}, { quantity: 2 });
```

#### Schema Inference from Sample Data

```javascript
import { factory } from 'shujau-mock-factory';

const sampleUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  age: 30
};

const users = factory(sampleUser, { quantity: 3, isSample: true });
```

#### Unique Integer Management

```javascript
import { factory, setUniqueIntStart, resetUniqueIntCounter } from 'shujau-mock-factory';

setUniqueIntStart(1000);
const users = factory({ id: 'uniqueInt', name: 'fullName' }, { quantity: 2 });

resetUniqueIntCounter(); // Resets the counter to 0
```

## Migrating from v1.x to v2.0

Version 2.0 introduces a new options object for the `factory` function, but maintains backwards compatibility:

```javascript
// Old way (still supported)
const oldWay = factory(schema, 2);

// New way
const newWay = factory(schema, { quantity: 2 });

// Using sample data (previously factoryFromSample)
const fromSample = factory(sampleData, { quantity: 2, isSample: true });
```

The `factoryFromSample` function is deprecated and will be removed in the next major version.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
