import useSWR from "swr";

const fetcher = async (req) => {
    const res = await fetch(req);
    return await res.json();
  };

const PageViews = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);

  return <>{data?.total ? `${data.total} vues` : `–––`}</>;
};

export default PageViews;
