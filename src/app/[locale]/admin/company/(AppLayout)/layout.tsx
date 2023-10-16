import CompanyLayout from "@/components/Layout/CompanyLayout";

export default async function SubLayout(props: any) {
  const { children } = props;
  return <CompanyLayout>{children}</CompanyLayout>;
}
