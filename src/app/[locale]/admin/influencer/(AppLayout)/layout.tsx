import InfluencerLayout from "@/components/Layout/InfluencerLayout";

export default async function SubLayout(props: any) {
  const { children } = props;
  return <InfluencerLayout>{children}</InfluencerLayout>;
}
