export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/detalhes",
      permanent: false,
    },
  };
}

export default function Index() {
  return null;
}