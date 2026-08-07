import type { GetServerSideProps } from "next";

export default function NewHereRedirect() {
  return null;
}

export const getServerSideProps = (async () => ({
  redirect: {
    destination: "/plan-your-visit",
    statusCode: 301,
  },
})) satisfies GetServerSideProps;
