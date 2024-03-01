const { faker } = require('@faker-js/faker');

function mapToTableRow() {
  return {
    // NOTE: Limit latitude to +-85°, even if it's possible to extend the range to +-90, maps are rendered as white space in the extremes because of projection
    latitude: faker.location.latitude({ precision: 8, min: -85, max:85 }),
    longitude: faker.location.longitude({ precision: 8, min: -180, max:180 }),
    person_name: faker.person.fullName(),
    service_name: faker.person.jobTitle()
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('services').del()
  await knex('services').insert(
    Array.from(
      { length: 100 },
      mapToTableRow
    )
  );
};
