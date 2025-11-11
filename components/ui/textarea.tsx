import { useId } from 'react';
import { Text, TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  labelStyle?: string;
  inputStyle?: string;
  onChange?: (value: string) => void;
} & React.ComponentProps<typeof TextInput>;

export function Textarea({ label, labelStyle, inputStyle, onChange, ...props }: Props) {
  const id = useId();

  return (
    <View className="w-full items-start gap-2">
      <Text className={twMerge('text-title font-semibold', labelStyle)} nativeID={id}>
        {label}
      </Text>

      <TextInput
        accessibilityLabelledBy={id}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        {...props}
        onChangeText={(text) => onChange && onChange(text)}
        className={twMerge(
          'border-border placeholder:text-border w-full rounded-md border px-4 py-3 text-foreground',
          inputStyle
        )}
        style={{
          minHeight: 120,
          textAlignVertical: 'top',
        }}
      />
    </View>
  );
}
