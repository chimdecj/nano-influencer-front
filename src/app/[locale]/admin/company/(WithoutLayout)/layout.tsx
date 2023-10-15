export default async function SubLayout(props: any) {
  const { children } = props;
  return <div className="h-full bg-white dark:bg-gray-1000 overflow-auto">{children}</div>;
}
