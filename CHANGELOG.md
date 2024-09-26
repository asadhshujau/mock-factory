# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2023-09-26

### Fixed
- Corrected handling of array schemas in the factory function
- Added warning when `isSample` option is incorrectly used with array schemas

## [2.0.0] - 2024-09-26

### Changed
- Refactored `factory` function to use an options object for additional parameters.
- Added `isSample` option to explicitly indicate when input should be treated as a sample.
- Consolidated `factory` and `factoryFromSample` into a single `factory` function.
- Maintained backwards compatibility with previous API by supporting a number as the second argument for quantity.

### Deprecated
- `factoryFromSample` function. Use `factory` with `isSample: true` instead.

## [1.4.1] - 2024-09-23

### Added
- Date inference in schema inference feature
- Support for 'date' and 'datetime' types in type generators
- Tests for date inference

### Changed
- Updated `schemaInference.js` to handle date and datetime strings
- Updated `typeGenerators.js` to include date and datetime generators

## [1.4.0] - 2024-09-23

### Added
- Schema inference feature
- New `factoryFromSample` function to generate mock data from sample data
- New `inferSchema` function to automatically generate schema from sample data
- Support for nested object structures in schema inference
- Tests for schema inference feature, including nested objects
- Documentation for using schema inference

## [1.3.0] - 2023-09-23

### Added
- Custom type definitions feature
- New `defineType(name, generator)` function to create custom types
- Tests for custom type definitions
- Documentation for using custom type definitions

## [1.2.0] - 2023-09-23

### Added
- Seeding mechanism to generate consistent data across different runs
- New `setSeed(seed)` function to set the seed for data generation
- Tests for the new seeding feature

### Changed
- Updated README.md with information about the new seeding feature

## [1.1.3] - 2024-09-19

### Added
- Initial release of shujau-mock-factory
- Basic data generation functionality
- Support for various data types and nested structures
- Custom generator functions
- Unique integer generation
- Ability to reset unique integer counter

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A
