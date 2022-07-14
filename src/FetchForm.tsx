import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useForm } from "./lib";
import { z } from "zod";
import React from "react";
import { queryClient } from "./query";

// define the person fields
const PersonSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  favoriteNumber: z.number().optional(),
});

// extract the type from the person schema
export type Person = z.infer<typeof PersonSchema>;

// define the component props
interface PersonFormProps {
  personId?: string;
}

export default function PersonForm({ personId }: PersonFormProps) {
  // initialize the form to empty state
  const form = useForm<Person>({
    favoriteNumber: undefined,
    firstName: "",
    lastName: "",
  });

  // fetch person if personId present
  const query = useQuery({
    enabled: Boolean(personId),
    queryKey: ["person", personId],
    queryFn: () => axios.get(`/people/${personId}`),
    onSuccess: (res) => {
      // validate the person data to ensure it adheres to our typed schema
      const person = PersonSchema.parse(res.data.person);
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
      return queryClient.invalidateQueries(["person", personId]);
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
      <div className="mt-8 max-w-md m-auto">
        <div className="grid grid-cols-1 gap-6">
          <label className="block" htmlFor="firstName">
            <span className="text-gray-700">First name</span>
            <input
              id="firstName"
              type="text"
              className="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
              placeholder=""
              value={form.currentValues.firstName}
              onChange={(e) => form.setValue("firstName", e.target.value)}
            />
          </label>
          <label className="block" htmlFor="lastName">
            <span className="text-gray-700">Last name</span>
            <input
              id="lastName"
              type="text"
              className="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
              placeholder=""
              value={form.currentValues.lastName}
              onChange={(e) => form.setValue("lastName", e.target.value)}
            />
          </label>
          <label className="block" htmlFor="favoriteNumber">
            <span className="text-gray-700">Favorite Number</span>
            <select
              id="favoriteNumber"
              className="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
              placeholder=""
              value={form.currentValues.favoriteNumber}
              onChange={(e) =>
                form.setValue("favoriteNumber", Number(e.target.value))
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
          <div className="text-right">
            <button
              disabled={mutation.isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
