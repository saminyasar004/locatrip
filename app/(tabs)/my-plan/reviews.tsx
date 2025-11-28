import Layout from 'components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';

interface Review {
  author: string;
  rating: number;
  text: string;
  time: string;
}

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { place_name, total_rating, total_reviews, reviews } = params;

  const [parsedReviews, setParsedReviews] = useState<Review[]>([]);
  const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  useEffect(() => {
    if (reviews) {
      try {
        const parsed = JSON.parse(reviews as string);
        setParsedReviews(parsed);

        // Calculate rating counts
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        parsed.forEach((review: Review) => {
          const rating = Math.round(review.rating);
          if (rating >= 1 && rating <= 5) {
            counts[rating as keyof typeof counts]++;
          }
        });
        setRatingCounts(counts);
      } catch (e) {
        console.error('Failed to parse reviews', e);
      }
    }
  }, [reviews]);

  const totalReviewsCount = Number(total_reviews) || parsedReviews.length;
  const currentRating = Number(total_rating) || 0;

  const getPercentage = (count: number) => {
    if (parsedReviews.length === 0) return 0;
    return (count / parsedReviews.length) * 100;
  };

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">Reviews</Text>
        </View>

        <ScrollView
          className="flex w-full flex-1 flex-col gap-2 py-4"
          showsVerticalScrollIndicator={false}>
          <View className="flex w-full flex-col gap-2 py-8">
            <Text className="text-center text-2xl font-medium">{place_name || 'Place Name'}</Text>
            <Text className="text-center text-3xl font-semibold text-primary">
              {currentRating.toFixed(1)}
            </Text>
            <Text className="text-center text-lg text-[#63707C]">{totalReviewsCount} reviews</Text>

            <View className="flex w-full flex-col gap-2 py-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <View key={star} className="flex w-full flex-row items-center gap-3">
                  <Text className="w-4 text-lg font-normal">{star}</Text>
                  <Star size={18} fill={'#E7AE33'} color={'#E7AE33'} />
                  <View className="flex h-2 flex-1 items-start rounded-full bg-[#D9D9D9]">
                    <View
                      className="h-full rounded-full bg-[#EABE5E]"
                      style={{ width: `${getPercentage(ratingCounts[star])}%` }}></View>
                  </View>
                  <Text className="w-6 text-right text-lg font-medium">{ratingCounts[star]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">Feedback</Text>
            {/* <Text className="text-base font-semibold text-primary">View All</Text> */}
          </View>

          {parsedReviews.length > 0 ? (
            parsedReviews.map((review, index) => (
              <View key={index} className="mb-4 flex w-full flex-col gap-4 rounded-lg bg-white p-4">
                <View className="flex w-full flex-row items-center justify-start gap-2">
                  <Image
                    source={{
                      uri: `https://ui-avatars.com/api/?name=${review.author}&background=random`,
                    }}
                    className="h-10 w-10 rounded-full"
                  />

                  <View className="flex flex-col">
                    <Text className="text-lg font-medium">{review.author}</Text>
                    <View className="flex flex-row items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < review.rating ? '#E7AE33' : '#D9D9D9'}
                          color={i < review.rating ? '#E7AE33' : '#D9D9D9'}
                        />
                      ))}
                      <Text className="pl-2 text-sm text-[#63707C]">{review.time}</Text>
                    </View>
                  </View>
                </View>
                <View className="flex w-full items-start">
                  <Text className="text-base text-[#63707C]">{review.text}</Text>
                </View>
              </View>
            ))
          ) : (
            <View className="flex items-center justify-center py-10">
              <Text className="text-gray-500">No reviews available.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}
