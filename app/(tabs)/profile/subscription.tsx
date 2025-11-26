import SubscriptionView from '@/components/SubscriptionView';
import { useRouter } from 'expo-router';

export default function Subscription() {
  const router = useRouter();

  return <SubscriptionView onBack={() => router.back()} />;
}
