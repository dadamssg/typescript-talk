/* eslint-disable */

// variables

let name = "David";

// unions
type Status = "in progress" | "completed" | "not started";

function changeTaskStatus(task: any, status: Status) {}

const task = {};
changeTaskStatus(task, "in progress");

// intersections
type Point = {
  x: number;
  y: number;
};

type ThreeDPoint = Point & { z: number };

let location: ThreeDPoint = { x: 0, y: 0, z: 1 };

// function args

// object types
type Person = {
  firstName: string;
  lastName: string;
  favoriteNumber?: number;
};

let me: Person = {
  firstName: "David",
  lastName: "adams",
};

// mapped types / index signatures

type ResponseMap = {
  [key: string]: string;
};

// Record
type ResponseRecord = Record<string, number>;

// generics: Array, Promise.
const names: Array<{ name: string }> = [{ name: "david" }, { name: "donovan" }];

function getPerson(id: string): Promise<{ name: string }> {
  return Promise.resolve({ name: "David" });
}

// type narrowing

// type guards
function assertPerson(value: any): asserts value is Person {
  if (typeof value !== "object") {
    throw new Error("value is not person");
  }
}

function doSomething(x: any) {
  assertPerson(x);
  x.firstName;
}

// any, unknown

function doWhatever(name: unknown) {}

// as const
function greet(msg?: string) {
  const message = msg || "hello";
  return [message, () => window.alert(message)] as const;
}

const grt = greet("howdy");
const message = grt[0];
message.toUpperCase();
export {};

type SuccessPersonResponseBody = {
  person: Person;
};

type SuccessCompanyResponseBody = {
  company: {
    name: string;
  };
};

type ErrorResponseBody = {
  errors: Array<{ detail: string }>;
};

type ApiResponse<T> = T | ErrorResponseBody;

function Example({ json }: { json: ApiResponse<SuccessPersonResponseBody> }) {
  if ("person" in json) {
    json.person.firstName.toUpperCase();
  } else {
    json.errors.map(() => {});
  }
}
