import useSWR from "swr";

const fetcher = async (req) => {
  const res = await fetch(req);
  return await res.json();
};

const PageViews = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);

  const getTextViews = () => {
    if (data?.total === 1) {
      return "vue";
    } else if (data?.total > 1) {
      return "vues";
    }
  };

  return <>{data?.total ? `${data.total}  ${getTextViews()}` : `–––`}</>;
};

export default PageViews;
