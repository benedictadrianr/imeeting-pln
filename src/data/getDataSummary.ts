"use server";

export type TotalConsumptionProps = {
  name: string;
  totalPackage: string;
  totalPrice: string;
};

export type RoomProps = {
  roomName: string;
  capacity: number;
  averageOccupancyPerMonth: number;
  totalConsumption: TotalConsumptionProps[];
};

export type UnitProps = {
  officeName: string;
  detailSummary: RoomProps[];
};

export type SummaryProps = {
  id: number;
  createdAt: Date;
  period: string;
  data: UnitProps[];
};

export async function getDataSummary(): Promise<SummaryProps[] | null> {
  try {
    const res = await fetch(
      "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings",
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = (await res.json()) satisfies SummaryProps[];
    return data as SummaryProps[];
  } catch (err) {
    console.error(err);
    return null;
  }
}
