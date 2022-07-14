import React from "react";
import { useMutation, useQuery } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useValues } from "../../lib";

type PersonFormProps = {
  personId: string;
};

type Person = {
  favoriteNumber?: number;
  firstName: string;
  lastName: string;
};

type ErrorResponse = {
  errors: Array<{ detail: string }>;
};

const initialFormState: Person = {
  firstName: "",
  lastName: "",
};

function getPerson(id: string): Promise<Person> {
  return axios.get(`/person/${id}`).then((res) => res.data.person);
}

export default function PersonForm({ personId }: PersonFormProps) {
  // initialize the form to empty state
  const form = useValues(initialFormState);

  // fetch person if personId present
  const query = useQuery({
    enabled: Boolean(personId),
    queryKey: ["person", personId],
    queryFn: () => getPerson(personId),
    onSuccess: (person) => {
      // update the forms initial values with the person data
      form.setInitialValues(person);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        console.log((err.response?.data as ErrorResponse).errors);
      }
      console.log(err);
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
      <input
        id="favoriteNumber"
        type="number"
        value={form.currentValues.favoriteNumber}
        onChange={(e) => form.setValue("favoriteNumber", e.target.value)}
      />
      <button disabled={mutation.isLoading}>Submit</button>
    </form>
  );
}
