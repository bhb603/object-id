# Object IDs

A simple Deno / JS module for generating ObjectIds.

> ObjectIds are small, likely unique, fast to generate, and ordered. ObjectId
> values are 12 bytes in length, consisting of:
>
> - A 4-byte timestamp, representing the ObjectId's creation, measured in
>   seconds since the Unix epoch.
> - A 5-byte random value generated once per process. This random value is
>   unique to the machine and process.
> - A 3-byte incrementing counter, initialized to a random value.

- See
  https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid
