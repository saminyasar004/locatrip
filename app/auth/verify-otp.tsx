import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function VerifyOTP() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Verify Your Identity!</Text>
            <Text className="font-light leading-6 text-white">
              We've sent a one-time password (OTP) to your email. Enter the code below and get
              started!
            </Text>
          </View>
        </View>
        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            <View className="flex w-full flex-row justify-center gap-3">
              {Array.from({ length: 4 }, (_, i) => (
                <TextInput
                  key={i}
                  className="h-20 w-20 rounded-2xl bg-accent p-5 pl-5 text-center text-4xl font-medium text-foreground"
                  placeholder="-"
                  placeholderTextColor="#0F0F0F"
                />
              ))}
            </View>

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={() => router.push('/auth/reset-password')}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">Verify</Text>
              </TouchableHighlight>
            </View>

            {/* Don't get OTP? Section */}
            <View className="flex w-full flex-row items-center justify-center gap-2">
              <Text className="text-lg">Don't get OTP?</Text>
              <TouchableHighlight underlayColor="transparent">
                <Text className="text-lg font-medium text-primary underline">Resend</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
