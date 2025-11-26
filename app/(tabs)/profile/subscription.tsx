import SubscriptionView from '@/components/SubscriptionView';
import Layout from 'components/layout';
import { useRouter } from 'expo-router';

export default function Subscription() {
  const router = useRouter();

  return (
    <Layout>
      <SubscriptionView onBack={() => router.back()} />
    </Layout>
  );
}
