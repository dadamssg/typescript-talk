/* eslint-disable */

// variables
let firstName = "David";
let lastName: string | undefined = "Adams";

// unions
type Status = "pass" | "fail" | "in progress";

let taskStatus: Status = "pass";

// intersections
type Point = {
  x: number;
  y: number;
};

type ThreeDPoint = Point & { z: number };

let point: ThreeDPoint = { x: 0, y: 0, z: 0 };

// function args
function compute(x: number, y: number, msg?: string) {
  // inferred return
  return `${msg?.toUpperCase()}: ${x * y}`;
}

function computeObj({ x, y, msg }: { x: number; y: number; msg?: string }) {
  return `${msg?.toUpperCase()}: ${x * y}`;
}

function advanceTask(task: any, currentState: Status) {}

advanceTask({}, "pass");

// object types
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  children: Array<Person>;
  readonly favoriteColors: Array<string>;
};

let david: Person = {
  firstName: "David",
  lastName: "Adams",
  age: 34,
  children: [
    {
      age: 0,
      children: [],
      favoriteColors: ["foo"],
      firstName: "",
      lastName: "",
    },
  ],
  favoriteColors: ["green", "blue"],
};

// generics: Array, Promise. API Response

let promise = new Promise<{ msg: string }>((resolve) => {
  resolve({ msg: "hello" });
});

promise.then((result) => console.log(result.msg));

type ResponseBody = {
  people?: Array<Person>;
  error?: Array<{ detail: string }>;
};

type PeopleResponseBody = {
  people: Array<Person>;
};

type ErrorResponseBody = {
  error: Array<{ detail: string }>;
};

type ResponseBody = PeopleResponseBody | ErrorResponseBody;

type ApiResponse<T> = T | ErrorResponseBody;

function fetchPeople(): ApiResponse<PeopleResponseBody> {
  if (Math.random() > 0.5) {
    return { people: [] };
  }
  return { error: [{ detail: "AH!" }] };
}

const res = fetchPeople();

if ("people" in res) {
  res.people.map(console.log);
}

type Timings = {
  [index: string]: number;
};

const sqlTimes: Timings = {
  "select * from table": 123,
};

console.log(sqlTimes.foobar);

// Record<K, V>
type RecordTimings = Record<string, number>;
type Names = "David" | "James" | "Kevin";
type Skills = Record<Names, Array<string>>;

let skills: Skills = {
  David: [],
  James: ["sql", "php", "node"],
  Kevin: ["getting things from the top shelf"],
};

// type narrowing
function doSomething(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
  if (isPerson(value)) {
    value.firstName.toUpperCase();
  }
  assertPerson(value);
  console.log(value.age + 12);
}

function isPerson(value: unknown): value is Person {
  return true;
}

function assertPerson(value: unknown): asserts value is Person {
  if (typeof value !== "object") {
    throw new Error(`NOT A PERSON ${JSON.stringify(value)}`);
  }
}

export {};
