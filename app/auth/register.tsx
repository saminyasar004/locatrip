import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from 'app/store/authStore';
import AppleImg from 'assets/apple.svg';
import GoogleImg from 'assets/google.svg';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import { cn } from 'utils';
import { z } from 'zod';

const signupSchema = z
  .object({
    full_name: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords must match',
    path: ['confirm_password'],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function Index() {
  const { register, isLoading, error, user, isAuthenticated } = useAuthStore();

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { full_name: '', email: '', password: '', confirm_password: '' },
  });

  const handleSignup = async (formData: SignupForm) => {
    console.log('Registering with data:', formData);

    try {
      await register(formData);

      if (!useAuthStore.getState().error) {
        router.replace('/home');

        Toast.success('Successfully registered!');
      }
      console.log('Successfully registered!');
    } catch (err: any) {
      console.log('Error occured while handling signup form: ', err.message);
      useAuthStore.setState({ error: err.message });
      Toast.error(err.message || 'Signup failed');
    }
  };

  useEffect(() => {
    console.log({
      isLoading,
      user,
      isAuthenticated,
      error,
    });
  }, [isLoading, user, error, isAuthenticated]);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
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
              <Text className="font-semibold text-[#575757]">Full Name</Text>
              <Controller
                control={signupForm.control}
                name="full_name"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error: fieldError },
                }) => (
                  <>
                    <TextInput
                      className={cn(
                        'h-16 rounded-lg border border-transparent bg-accent p-5 pl-5 text-foreground',
                        fieldError && 'border-red-500'
                      )}
                      placeholder="Enter full name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldError && <Text className="text-red-500">{fieldError.message}</Text>}
                  </>
                )}
              />
            </View>

            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Email Address</Text>
              <Controller
                control={signupForm.control}
                name="email"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error: fieldError },
                }) => (
                  <>
                    <TextInput
                      className={cn(
                        'h-16 rounded-lg border border-transparent bg-accent p-5 pl-5 text-foreground',
                        fieldError && 'border-red-500'
                      )}
                      placeholder="Enter email address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldError && <Text className="text-red-500">{fieldError.message}</Text>}
                  </>
                )}
              />
            </View>

            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Password</Text>

              <Controller
                control={signupForm.control}
                name="password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error: fieldError },
                }) => (
                  <>
                    <View
                      className={cn(
                        'flex h-16 w-full flex-row items-center justify-between rounded-lg border border-transparent bg-accent pl-5 pr-5',
                        fieldError && 'border-red-500'
                      )}>
                      <TextInput
                        className="max-w-[90%] text-foreground"
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

            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Confirm Password</Text>

              <Controller
                control={signupForm.control}
                name="confirm_password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error: fieldError },
                }) => (
                  <>
                    <View
                      className={cn(
                        'flex h-16 w-full flex-row items-center justify-between rounded-lg border border-transparent bg-accent pl-5 pr-5',
                        fieldError && 'border-red-500'
                      )}>
                      <TextInput
                        className="max-w-[90%] text-foreground"
                        placeholder="*********"
                        secureTextEntry={!showConfirmPassword}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableHighlight
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        underlayColor="transparent">
                        {showConfirmPassword ? (
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

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={signupForm.handleSubmit(handleSignup)}
                disabled={isLoading}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">
                  {isLoading ? 'Registering...' : 'Register'}
                  {/* Register */}
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
      </ScrollView>
    </SafeAreaView>
  );
}
