import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Reset Your Password</Text>
            <Text className="font-light leading-6 text-white">
              Enter your new password below to reset your account.
            </Text>
          </View>
        </View>
        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Enter New Password</Text>

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

            <View className="flex w-full flex-row items-center justify-between gap-5">
              <BouncyCheckbox
                className="flex w-min items-center gap-2"
                size={20}
                fillColor="#F86241"
                unFillColor="#FFFFFF"
                textComponent={<Text className="font-medium">Remember me</Text>}
                iconStyle={{ borderColor: '#F86241' }}
                innerIconStyle={{ borderWidth: 1.5, borderRadius: 6 }}
                textStyle={{ fontFamily: 'Inter' }}
              />
            </View>

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">Confirm</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
