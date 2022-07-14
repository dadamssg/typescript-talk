import React from "react";
import { z } from "zod";

const personSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  favoriteNumber: z.number().optional(),
});

type Person = z.infer<typeof personSchema>;

const me: Person = {
  favoriteNumber: undefined,
  firstName: "",
  lastName: "",
};

export default function ZodExample({ json }: { json: unknown }) {
  const res = personSchema.parse(json);
  console.log(res.favoriteNumber);
  const result = personSchema.safeParse(json);
  const person = result.success ? result.data : { favoriteNumber: 0 };
  return <div>{person.favoriteNumber?.toFixed()}</div>;
}

function doSomething(foo) {
  if (typeof foo == "object") {
    console.log(foo.favoriteNumber);
  }
}
