import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function RequestResetPassword() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Trouble Loggin In?</Text>
            <Text className="font-light leading-6 text-white">
              No worries! Just enter your email address below, and we'll send you a link to reset
              your password.
            </Text>
          </View>
        </View>
        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Enter Email Address</Text>
              <TextInput
                className="h-14 rounded-lg bg-accent p-5 pl-5 text-foreground"
                placeholder="Enter email address"
              />
            </View>

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={() => router.push('/auth/verify-otp')}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
