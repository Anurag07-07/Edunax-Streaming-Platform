import React from 'react'
import { DataTable } from './_components/data-table'
import { columns, Payment } from './_components/columns';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function CommunityPage() {
  const data = await getData();
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
