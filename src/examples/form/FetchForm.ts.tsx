import React from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useValues } from "../../lib";

type Person = {
  favoriteNumber?: number;
  firstName: string;
  lastName: string;
};

function getPerson(personId: string): Promise<Person> {
  return axios.get(`/person/${personId}`).then((res) => res.data.person);
}

type PersonFormProps = {
  personId: string;
};

const initialState: Person = {
  favoriteNumber: undefined,
  firstName: "",
  lastName: "",
};

export default function PersonForm({ personId }: PersonFormProps) {
  // initialize the form to empty state
  const form = useValues(initialState);

  // fetch person if personId present
  const query = useQuery({
    enabled: Boolean(personId),
    queryKey: ["person", personId],
    queryFn: () => getPerson(personId),
    onSuccess: (person) => {
      // update the forms initial values with the person data
      form.setInitialValues(person);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: Person) => {
      const url = personId ? `/people/${personId}` : "/person";
      return axios.post(url, { person: data });
    },
    onSuccess: (res) => {
      window.alert(res.data.message || "Success!");
    },
  });

  if (query.isFetching) {
    return <span>Loading...</span>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form.currentValues);
      }}
    >
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        value={form.currentValues.firstName}
        onChange={(e) => form.setValue("firstName", e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        value={form.currentValues.lastName}
        onChange={(e) => form.setValue("lastName", e.target.value)}
      />
      <label htmlFor="Favorite Number">Favorite Number</label>
      <select
        id="favoriteNumber"
        value={form.currentValues.favoriteNumber}
        onChange={(e) =>
          form.setValue("favoriteNumber", Number(e.target.value))
        }
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <button disabled={mutation.isLoading}>Submit</button>
    </form>
  );
}
