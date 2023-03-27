export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>{id} page</div>;
}
