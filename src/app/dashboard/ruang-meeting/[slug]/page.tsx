import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const RuangMeetingSlug = async ({ params }: Props) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};

export default RuangMeetingSlug;
