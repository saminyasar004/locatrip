import SubscriptionView from '@/components/SubscriptionView';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';

export default function Index() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="bg-background">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="row flex h-[90vh] flex-col items-center justify-center gap-24">
          <View className="flex w-full items-center justify-center">
            <Text className="text-center text-3xl font-semibold">
              Would you like to build a <Text className="text-primary">personalized</Text>{' '}
              itinerary?
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between gap-6">
            <TouchableHighlight
              onPress={() => setModalVisible(true)}
              className="flex flex-1 items-center justify-center rounded-full bg-primary p-3 shadow-sm">
              <Text className="text-lg font-semibold text-white">Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => router.push('/home')}
              className="flex flex-1 items-center justify-center rounded-full border-2 border-primary bg-background p-3 shadow-sm"
              underlayColor="transparent">
              <Text className="text-lg font-semibold text-primary">No</Text>
            </TouchableHighlight>
          </View>
        </View>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          style={{ margin: 0 }}
          useNativeDriver
          hideModalContentWhileAnimating>
          <View className="h-full w-full bg-white">
            <SubscriptionView onBack={() => setModalVisible(false)} showHeader={true} />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
