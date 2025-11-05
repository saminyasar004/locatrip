import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from 'store/authStore';
import useProfileStore from 'store/profileStore';
import AppleImg from 'assets/apple.svg';
import GoogleImg from 'assets/google.svg';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { login, user, isLoading, error } = useAuthStore();
  const { init } = useProfileStore();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (formData: LoginForm) => {
    try {
      await login(formData);

      if (!useAuthStore.getState().error) {
        router.replace('/home');
        Toast.success('Successfully logged in!');
      }
    } catch (err: any) {
      console.log('Error occured while handling login form: ', err.message);
      useAuthStore.setState({ error: err.message });
      Toast.error(err.message || 'Login failed');
    }
  };

  useEffect(() => {
    if (user) {
      init({
        email: user.email,
        full_name: user.full_name,
        image: null,
      });
    }
  }, [user]);

  return (
    <SafeAreaView className="h-full w-full flex-1 bg-primary" style={{ paddingTop: top }}>
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Welcome Back!</Text>
            <Text className="font-light leading-6 text-white">
              Log in to continue your personalized travel journey. Access your itineraries,and
              recommendations anytime.
            </Text>
          </View>
        </View>
        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Email Address</Text>
              <Controller
                control={loginForm.control}
                name="email"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error: fieldError },
                }) => (
                  <>
                    <TextInput
                      className={`h-16 rounded-lg bg-accent p-5 pl-5 text-foreground placeholder:text-[#63707C] ${fieldError ? 'border border-red-500' : ''}`}
                      placeholder="Enter email address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    {fieldError && <Text className="text-red-500">{fieldError.message}</Text>}
                  </>
                )}
              />
            </View>

            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Password</Text>
              <Controller
                control={loginForm.control}
                name="password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error: fieldError },
                }) => (
                  <>
                    <View
                      className={`flex h-16 w-full flex-row items-center justify-between overflow-hidden rounded-lg bg-accent pl-5 pr-5 ${fieldError ? 'border border-red-500' : ''}`}>
                      <TextInput
                        className="flex-1 text-foreground placeholder:text-[#63707C]"
                        placeholder="*********"
                        secureTextEntry={!showPassword}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableHighlight
                        onPress={() => setShowPassword(!showPassword)}
                        underlayColor="transparent">
                        {showPassword ? (
                          <EyeOff color="#F86241" size={20} />
                        ) : (
                          <Eye color="#F86241" size={20} />
                        )}
                      </TouchableHighlight>
                    </View>
                    {fieldError && <Text className="text-red-500">{fieldError.message}</Text>}
                  </>
                )}
              />
            </View>

            {error && <Text className="mt-4 text-center text-red-500">{error}</Text>}

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
              <TouchableHighlight
                onPress={() => router.push('/auth/request-reset-password')}
                underlayColor="transparent">
                <Text className="font-medium text-primary underline">Forgot Password</Text>
              </TouchableHighlight>
            </View>

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={loginForm.handleSubmit(handleLogin)}
                disabled={isLoading}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">
                  {isLoading ? 'Logging in...' : 'Login'}
                </Text>
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
                <Text className="text-lg">Don't have an account?</Text>
                <TouchableHighlight
                  onPress={() => router.push('/auth/register')}
                  underlayColor="transparent">
                  <Text className="text-lg font-medium text-primary underline">Register</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
