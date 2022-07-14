import {useReducer, useCallback, useMemo, Reducer} from "react";
import isEqual from "react-fast-compare";

enum Kind {
  init,
  reset,
  setValue,
  setValues,
  deleteField,
  deleteFields,
}

type TAction<T> =
  | { type: Kind.init; values: T }
  | { type: Kind.reset }
  | { [k in keyof T]: { type: Kind.setValue; field: k; value: T[k] } }[keyof T]
  | { type: Kind.setValues; values: Partial<T> | ((values: T) => T) }
  | { type: Kind.deleteField; field: keyof T }
  | { type: Kind.deleteFields; fields: (keyof T)[] };

type TReducerState<T> = {
  initialValues: T;
  currentValues: T;
};

function reducer<T>(
  state: TReducerState<T>,
  action: TAction<T>
): TReducerState<T> {
  switch (action.type) {
    case Kind.init:
      return {
        initialValues: { ...action.values },
        currentValues: { ...action.values },
      };
    case Kind.reset:
      return {
        initialValues: state.initialValues,
        currentValues: state.initialValues,
      };
    case Kind.setValue:
      return {
        ...state,
        currentValues: {
          ...state.currentValues,
          [action.field as any]: action.value,
        },
      };
    case Kind.setValues:
      const values =
        typeof action.values === "function"
          ? action.values(state.currentValues)
          : action.values;
      return {
        ...state,
        currentValues: {
          ...state.currentValues,
          ...values,
        },
      };
    case Kind.deleteField: {
      let newValues = { ...state.currentValues };
      delete newValues[action.field];
      return {
        ...state,
        currentValues: newValues,
      };
    }
    case Kind.deleteFields: {
      let newValues = { ...state.currentValues };
      for (let field of action.fields) {
        delete newValues[field];
      }
      return {
        ...state,
        currentValues: newValues,
      };
    }
    default:
      return state;
  }
}

export default function useForm<T>(initValues: T) {
  let [state, dispatch] = useReducer<
    Reducer<TReducerState<T>, TAction<T>>
    >(reducer, {
    initialValues: { ...initValues },
    currentValues: { ...initValues },
  });

  let setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      dispatch({ type: Kind.setValue, field, value } as TAction<T>);
    },
    []
  );

  let setValues = useCallback(
    (values: Partial<T> | ((values: T) => T)) => {
      dispatch({ type: Kind.setValues, values });
    },
    []
  );

  let deleteField = useCallback(<K extends keyof T>(field: K) => {
    dispatch({ type: Kind.deleteField, field });
  }, []);

  let deleteFields = useCallback(
    <K extends keyof T>(fields: (keyof T)[]) => {
      dispatch({ type: Kind.deleteFields, fields });
    },
    []
  );

  let setInitialValues = useCallback((values: T) => {
    dispatch({ type: Kind.init, values });
  }, []);

  let reset = useCallback(() => dispatch({ type: Kind.reset }), []);

  let { initialValues, currentValues } = state;

  const isClean: boolean = useMemo(() => {
    return isEqual(initialValues, currentValues);
  }, [initialValues, currentValues]);

  return {
    initialValues,
    currentValues,
    setInitialValues,
    setValue,
    setValues,
    deleteField,
    reset,
    deleteFields,
    isClean,
    isDirty: !isClean,
  };
}
