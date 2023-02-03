export interface IDriver {
  DriverId: string;
  URL: string;
  children: [
    {
      name: string;
      value: any;
    },
    {
      name: string;
      value: any;
    },
    {
      name: string;
      value: any;
    },
    {
      name: string;
      value: any;
    }
  ];
}