import "jest";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 4000;

import {dynaObjectScan} from "../../src";

// help: https://facebook.github.io/jest/docs/expect.html

describe("dynaObjectScan", () => {
  test('Scan simple object', () => {
    const output: any[] = [];
    dynaObjectScan(
      {
        fname: 'John',
        lname: 'Smith',
        age: 37,
      },
      ({path, value}) => output.push({path, value}),
    );
    expect(output).toMatchSnapshot();
  });

  test('Scan object with nested objects', () => {
    const output: any[] = [];
    dynaObjectScan(
      {
        fname: 'John',
        lname: 'Smith',
        age: 37,
        favoriteSweets: {
          panCakes: true,
          strawberries: false,
          kiwi: 'maybe',
        },
      },
      ({path, value}) => output.push({path, value}),
    );
    expect(output).toMatchSnapshot();
  });

  test('Scan object with nested objects and arrays', () => {
    const output: any[] = [];
    dynaObjectScan(
      {
        fname: 'John',
        lname: 'Smith',
        age: 37,
        favoriteSweets: {
          panCakes: true,
          strawberries: false,
          kiwi: 'maybe',
        },
        favoriteCars: 'Honda,Porsche'.split(','),
      },
      ({path, value}) => output.push({path, value}),
    );
    expect(output).toMatchSnapshot();
  });

  test('Scan object and skip', () => {
    const output: any[] = [];
    dynaObjectScan(
      {
        fname: 'John',
        lname: 'Smith',
        age: 37,
        favoriteSweets: {
          panCakes: true,
          strawberries: false,
          kiwi: 'maybe',
        },
        favoriteCars: 'Honda,Porsche'.split(','),
      },
      ({path, value, skip, propertyName}) => {
        if (propertyName === 'favoriteSweets') {
          skip(); // This will block the scan of the `favoriteSweets` property
          return;
        }
        output.push({path, value})
      },
    );
    expect(output).toMatchSnapshot();
  });

  test('Scan array', () => {
    const output: any[] = [];
    dynaObjectScan(
      [
        'Apple',
        'Banana',
        {
          name: 'Lola',
          age: 32,
        },
      ],
      ({path, value}) => output.push({path, value}),
    );
    expect(output).toMatchSnapshot();
  });
});
