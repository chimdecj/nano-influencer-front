import CampaignDetail from "@/components/campaign/detail";

interface PageProps {
  params: {
    id: string;
  };
}

const InfluencerCampaignPage = async ({ params: { id } }: PageProps) => {
  return (
    <div className="space-y-4">
      <CampaignDetail id={id} />
    </div>
  );
};

export default InfluencerCampaignPage;
