"use server";

export type KonsumsiProps = {
  createdAt: Date;
  name: string;
  maxPrice: number;
  id: string;
};

export async function getKonsumsi(): Promise<KonsumsiProps[] | null> {
  try {
    const res = await fetch(
      "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/masterJenisKonsumsi",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = (await res.json()) satisfies KonsumsiProps[];

    return data satisfies KonsumsiProps[];
  } catch (err) {
    console.error("getKonsumsi error:", err);
    return null;
  }
}
