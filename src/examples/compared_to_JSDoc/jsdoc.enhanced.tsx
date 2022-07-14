type SuccessResponse = {
  person: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
};

type ErrorResponse = {
  error: string;
};

type ApiResponse = Promise<SuccessResponse | ErrorResponse>;

function getPerson(id: string): ApiResponse {
  let responses = [
    {
      person: {
        firstName: "David",
        lastName: "Adams",
      },
    },
    {
      error: "AHHHH!",
    },
  ];
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  return Promise.resolve(randomResponse);
}

getPerson("123").then((res) => {
  const firstName = res.person.firstName;
  if (res.error) {
    console.log(res.person.firstName.toUpperCase());
  }
});

export {};
