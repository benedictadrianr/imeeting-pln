"use server";

export type UnitProps = {
  createdAt: Date;
  officeName: string;
  id: string;
};

export async function getUnit(): Promise<UnitProps[] | null> {
  try {
    const res = await fetch(
      "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = (await res.json()) satisfies UnitProps[];

    return data satisfies UnitProps[];
  } catch (err) {
    console.error("getUnit error:", err);
    return null;
  }
}
