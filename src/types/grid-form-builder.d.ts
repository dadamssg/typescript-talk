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

  export type FormBuilderProps = {
    formSchema: FormSchema;
  };

  export function FormBuilder({
    formSchema,
  }: FormBuilderProps): React.ReactElement;
}
