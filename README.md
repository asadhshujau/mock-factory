# faker-factory

A flexible and powerful fake data generator built on top of Faker.js.

## Installation

Using npm:
```bash
npm install faker-factory
```

Using yarn:
```bash
yarn add faker-factory
```

## Usage

```javascript
import factory from 'faker-factory';

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

## License

MIT
