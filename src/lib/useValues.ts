import type { Reducer } from "react";
import { useReducer, useCallback, useMemo } from "react";
import isEqual from "react-fast-compare";

enum Kind {
  init,
  reset,
  setValue,
  setValues,
  deleteField,
  deleteFields,
}

type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

type TAction<T extends object> =
  | { type: Kind.init; initialValues: T; currentValues?: T }
  | { type: Kind.reset }
  | { [k in keyof T]: { type: Kind.setValue; field: k; value: T[k] } }[keyof T]
  | { type: Kind.setValues; values: Partial<T> | ((values: T) => T) }
  | { type: Kind.deleteField; field: OptionalPropertyOf<T> }
  | { type: Kind.deleteFields; fields: OptionalPropertyOf<T>[] };

type TReducerState<T> = {
  initialValues: T;
  currentValues: T;
};

function reducer<T extends object>(
  state: TReducerState<T>,
  action: TAction<T>
): TReducerState<T> {
  switch (action.type) {
    case Kind.init:
      return {
        initialValues: { ...action.initialValues },
        currentValues: action.currentValues
          ? { ...action.currentValues }
          : { ...action.initialValues },
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

export default function useValues<T extends object>(
  initialValues: T,
  currentValues?: T
) {
  let [state, dispatch] = useReducer<Reducer<TReducerState<T>, TAction<T>>>(
    reducer,
    {
      initialValues: { ...initialValues },
      currentValues: currentValues
        ? { ...currentValues }
        : { ...initialValues },
    }
  );

  let setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    dispatch({ type: Kind.setValue, field, value } as TAction<T>);
  }, []);

  let setValues = useCallback((values: Partial<T> | ((values: T) => T)) => {
    dispatch({ type: Kind.setValues, values });
  }, []);

  let deleteField = useCallback((field: OptionalPropertyOf<T>) => {
    dispatch({ type: Kind.deleteField, field });
  }, []);

  let deleteFields = useCallback((fields: OptionalPropertyOf<T>[]) => {
    dispatch({ type: Kind.deleteFields, fields });
  }, []);

  let setInitialValues = useCallback((initialValues: T, currentValues?: T) => {
    dispatch({ type: Kind.init, initialValues, currentValues });
  }, []);

  let reset = useCallback(() => dispatch({ type: Kind.reset }), []);

  let { initialValues: iValues, currentValues: cValues } = state;

  const isClean: boolean = useMemo(() => {
    return isEqual(iValues, cValues);
  }, [iValues, cValues]);

  return {
    initialValues: iValues,
    currentValues: cValues,
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
