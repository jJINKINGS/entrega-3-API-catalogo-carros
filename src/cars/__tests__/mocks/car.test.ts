export const carCreateBodyMock = {
  name: "Car name",
  description: "Car description",
  brand: "Car brand",
  year: 2023,
  km: 10000,
};


export const carUpdateBodyMock = {
    name: "Car update",
    description: "Car description update",
    brand: "Car brand update",
    year: 2022,
    km: 100,
  };


export const carMock = {
  id: expect.any(String),
  name: "Car name",
  description: "Car description",
  brand: "Car brand",
  year: 2023,
  km: 10000,
};

export const carCreateBodyListMock = [
    {
        name: "Car name1",
        description: "Car description",
        brand: "Car brand",
        year: 2023,
        km: 10000,
      },
      {
        name: "Car name2",
        description: "Car description",
        brand: "Car brand",
        year: 2023,
        km: 10000,
      },
];



export const carListMock = [
  {
    id: expect.any(String),
    name: "Car name1",
    description: "Car description",
    brand: "Car brand",
    year: 2023,
    km: 10000,
  },
  {
    id: expect.any(String),
    name: "Car name2",
    description: "Car description",
    brand: "Car brand",
    year: 2023,
    km: 10000,
  },
];
