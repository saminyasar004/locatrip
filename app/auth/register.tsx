import AppleImg from 'assets/apple.svg';
import GoogleImg from 'assets/google.svg';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex min-h-max w-full flex-col gap-4">
        <View className="row gap-3 py-12">
          <Text className="text-2xl font-bold text-white">Create Your Account</Text>
          <Text className="font-light leading-6 text-white">
            Fill in your details below to get started on your personalized travel journey.
          </Text>
        </View>
      </View>
      <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
        <View className="row flex flex-col gap-4">
          <View className="flex w-full flex-col gap-2">
            <Text className="font-semibold text-[#575757]">Email Address</Text>
            <TextInput
              className="h-14 rounded-lg bg-accent p-5 pl-5 text-foreground"
              placeholder="Enter email address"
            />
          </View>

          <View className="flex w-full flex-col gap-2">
            <Text className="font-semibold text-[#575757]">Password</Text>

            <View className="flex h-14 w-full flex-row items-center justify-between rounded-lg bg-accent pl-5 pr-5">
              <TextInput
                className="max-w-[90%] text-foreground"
                placeholder="*********"
                secureTextEntry={!showPassword}
              />
              <TouchableHighlight
                onPress={() => setShowPassword(!showPassword)}
                underlayColor="transparent"
                className="">
                {showPassword ? (
                  <EyeOff color="#F86241" size={20} />
                ) : (
                  <Eye color="#F86241" size={20} />
                )}
              </TouchableHighlight>
            </View>
          </View>

          <View className="flex w-full flex-col gap-2">
            <Text className="font-semibold text-[#575757]">Confirm Password</Text>

            <View className="flex h-14 w-full flex-row items-center justify-between rounded-lg bg-accent pl-5 pr-5">
              <TextInput
                className="max-w-[90%] text-foreground"
                placeholder="*********"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableHighlight
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                underlayColor="transparent"
                className="">
                {showConfirmPassword ? (
                  <EyeOff color="#F86241" size={20} />
                ) : (
                  <Eye color="#F86241" size={20} />
                )}
              </TouchableHighlight>
            </View>
          </View>

          <View className="flex w-full flex-col gap-5 py-6">
            <TouchableHighlight className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
              <Text className="text-lg font-bold text-white">Register</Text>
            </TouchableHighlight>

            <View className="flex flex-row items-center gap-4">
              <View className="h-0.5 w-1/3 bg-dark-gray"></View>
              <Text className="text-lg font-medium text-[#808182]">Or Login With</Text>
              <View className="h-0.5 w-1/3 bg-dark-gray"></View>
            </View>

            <View className="flex w-full flex-row items-center justify-center gap-7 py-5">
              <View className="flex h-16 w-16 items-center justify-center rounded-lg border border-dark-gray/30">
                <GoogleImg className="h-10 w-10" />
              </View>

              <View className="flex h-16 w-16 items-center justify-center rounded-lg border border-dark-gray/30">
                <AppleImg className="h-10 w-10" />
              </View>
            </View>

            <View className="flex w-full flex-row items-center justify-center gap-2 pt-8 text-center">
              <Text className="text-lg">Already have an account?</Text>
              <TouchableHighlight
                onPress={() => router.push('/auth/login')}
                underlayColor="transparent">
                <Text className="text-lg font-medium text-primary underline">Login</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
