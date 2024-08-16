/**
 * @module
 *
 * This module provides functions for generating and parsing Object IDs.
 *
 * @example
 * ```ts
 * import objectid from "@bhb603/object-id";
 *
 * objectid.generate(); // "66bfa7a62b89ff9d0fef51a2"
 * objectid.parseTimestamp("66bfa7a62b89ff9d0fef51a2"); // 1723836326
 * objectid.fromTimestamp(953337600); // "38d2c7002b89ff9d0fef51a3"
 * ```
 */

// 5-byte random value generated once per process
const random = crypto.getRandomValues(new Uint8Array(5));
const randomHex = Array.from(random)
  .map((b) => hex(b, 2))
  .join("");

// 3-byte counter initialized to a random value
let counter = Math.floor(Math.random() * 0xffffff);

/**
 * Returns the hexadecimal string representation of a number padded with zeros to the specified length.
 */
function hex(value: number, length: number): string {
  return value.toString(16).padStart(length, "0");
}

function increment(): number {
  return (counter = (counter + 1) % 0xffffff);
}

/**
 * Generates a new Object ID using the current timestamp.
 * @returns {string} The Object ID as a hexadecimal string
 */
export function objectId(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  // 4-byte timestamp
  const timestampHex = hex(timestamp, 8);
  const counterHex = hex(increment(), 6);
  return `${timestampHex}${randomHex}${counterHex}`;
}

/**
 * Generates a new Object ID using the specified timestamp.
 * @param {number} timestamp The unix timestamp in SECONDS
 * @return {string} The Object ID as a hexadecimal string
 */
export function fromTimestamp(timestamp: number): string {
  const timestampHex = hex(timestamp, 8);
  const counterHex = hex(increment(), 6);
  return `${timestampHex}${randomHex}${counterHex}`;
}

/**
 * Parses the timestamp from an Object ID.
 * @param {string} objectId The Object ID to parse.
 * @return {number} The unix timestamp in SECONDS
 */
export function parseTimestamp(objectId: string): number {
  if (objectId.length !== 24) {
    throw new Error("Invalid Object ID");
  }
  const timestampHex = objectId.slice(0, 8);
  return parseInt(timestampHex, 16);
}

export default {
  generate: objectId,
  fromTimestamp,
  objectId,
  parseTimestamp,
} as const;
