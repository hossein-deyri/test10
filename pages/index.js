import MainPage from '@/components/mainPage';
import {
  getProductsQuery,
  getProductsByParams
} from 'services/productServices';

const Home = ({ content }) => {
  return <MainPage {...{ content }} />;
};

export async function getStaticProps() {
  const content = [...Array(10).keys()].map(async (index) => {
    // TODO: @ali: throw error on api catch state
    const queryData = await getProductsQuery(index + 1);

    let searchQuery = {
      ...(queryData?.endYear && { endYear: queryData?.endYear }),
      ...(queryData?.startYear && { startYear: queryData?.startYear }),
      ...(queryData?.personId && { persons: queryData?.personId }),
      ...(queryData?.role && { role: queryData?.role }),
      ...(queryData?.tags && { tags: queryData?.tags.join(',') })
    };

    if (searchQuery.tags) {
      // TODO: @ali: throw error on api catch state
      const { items } = await getProductsByParams(searchQuery);
      return {
        ...queryData,
        items
      };
    }

    return null;
  });

  const resolvedContent = await Promise.all(content);

  return {
    props: { content: resolvedContent },
    revalidate: 60
  };
}

export default Home;
