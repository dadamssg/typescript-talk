import * as React from "react";
import type { Map } from "immutable";

declare module "grid-form-builder" {
  export type BaseFieldConfig = {
    name: string;
    label?: string;
    required?: boolean;
    readonly?: boolean;
    icon?: string;
    iconStyle?: Record<string, any>;
  };

  export type InputFieldConfig = BaseFieldConfig & {
    // notice this is a literal string of "input" type, not `string`.  typescript will use these to distinguish types
    type: "input";
  };

  export type TextareaFieldConfig = BaseFieldConfig & {
    type: "textarea";
  };

  export type KeywordConfig = {
    category: string;
    options: Array<{
      label: string;
      value: string;
    }>;
  };

  export type RadioFieldConfig = BaseFieldConfig & {
    type: "radio";
    keyword: KeywordConfig;
  };

  export type FieldConfig =
    | InputFieldConfig
    | TextareaFieldConfig
    | RadioFieldConfig;

  export type Dimensions = {
    x: number;
    y: number;
    w: number;
    h: number;
  };

  export type FieldLayoutItem = {
    type: "field";
    dimensions: Dimensions;
    config: FieldConfig;
  };

  export type FormSchema = {
    layout: Array<FieldLayoutItem>;
  };

  export type HandleChangeEvent = {
    target: {
      name: string;
      value: string;
    };
  };

  export type FormBuilderProps = {
    formSchema: FormSchema;
    formValues?: Map<string, unknown>;
    handleOnChange?: (event: HandleChangeEvent) => void;
    onClick?: (config: FieldConfig) => void;
    draggable?: boolean;
    inline?: boolean;
  };

  export function FormBuilder(props: FormBuilderProps): React.ReactNode;
}
