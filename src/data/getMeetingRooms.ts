"use server";

export type RoomProps = {
  createdAt: Date;
  officeId: string;
  officeName: string;
  roomName: string;
  capacity: number;
  id: string;
};
export async function getRoom(): Promise<RoomProps[] | null> {
  try {
    const res = await fetch(
      "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterMeetingRooms",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = (await res.json()) satisfies RoomProps[];

    return data satisfies RoomProps[];
  } catch (err) {
    console.error("getRoom error:", err);
    return null;
  }
}
