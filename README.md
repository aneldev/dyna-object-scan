# dynaObjectScan

Scans deeply an object calling a callback.

Skips circular references.

The callback called with an object as argument with these properties:

```
propertyName: string | undefined;   // The name of the current property, number for array position
value: any;                         // The value of the current property
parent: any                         // The owner of the property
path: string | undefined;           // Full path of the value in the object
skip: () => void;                   // Function to skip the scan of the current value
```

# Examples

## Console path and value

```
dynaObjectScan(
  {
    fname: 'John',
    lname: 'Smith',
    cars: ['Honda', 'Porche'],
  },
  ({path, value}) => {
    console.log(path, value);
  },
)
```
Consoles:

```
.fname John
.lname Smith
.cars (2) > ["Honda", "Porche"]
.cars[0] Honda
.cars[1] Porche
```
## Console propertyName and value

```
dynaObjectScan(
  {
    fname: 'John',
    lname: 'Smith',
    cars: ['Honda', 'Porche'],
  },
  ({propertyName, value}) => {
    console.log(propertyName, value);
  },
)
```
Consoles:

```
fname John
lname Smith
cars (2) > ["Honda", "Porche"]
0 Honda
1 Porche
```

## Skip specific property

```
dynaObjectScan(
  {
    fname: 'John',
    lname: 'Smith',
    cars: ['Honda', 'Porche'],
  },
  ({path, value, skip}) => {
    if (path === '.cars') {
      skip(); // This will block the scan of the root `cars` property.
      return;
    }
    console.log(path, value);
  },
);

```
Consoles:

```
.fname John
.lname Smith
```
