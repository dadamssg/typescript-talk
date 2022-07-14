import React, { Fragment } from "react";
import { FormBuilder, FormSchema } from "grid-form-builder";

const schema: FormSchema = {
  layout: [
    {
      config: {
        type: "radio",
        name: "hello",
        keyword: {
          category: "foobar",
          options: [
            { label: "foo", value: "FOO" },
            { label: "bar", value: "BAR" },
          ],
        },
      },
      dimensions: { h: 0, w: 0, x: 0, y: 0 },
      type: "field",
    },
    {
      dimensions: { h: 0, w: 0, x: 0, y: 0 },
      type: "field",
      config: {
        type: "input",
        name: "whatever",
      },
    },
  ],
};

export default function FormBuilderExample() {
  return (
    <Fragment>
      <FormBuilder formSchema={schema} />
    </Fragment>
  );
}
