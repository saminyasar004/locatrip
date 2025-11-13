import DateTimePicker from '@react-native-community/datetimepicker';
import { Clock3 } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

interface TimeInputProps {
  label?: string;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({
  label = 'Start Time',
  placeholder = 'Select time',
  value,
  onChange,
}) => {
  const [time, setTime] = useState<Date>(value || new Date());
  const [showPicker, setShowPicker] = useState(false);

  // 🕐 Initial value — 12-hour format with AM/PM
  const [inputValue, setInputValue] = useState(
    value
      ? value.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      : ''
  );

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === 'ios');
    setTime(currentDate);

    // ✅ Format selected time → 12-hour with AM/PM
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    setInputValue(formattedTime);
    onChange?.(currentDate);
  };

  return (
    <View className="flex flex-col gap-3">
      <Text className="font-medium text-[#3D3D3D]">{label}</Text>

      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
        className="flex flex-row items-center rounded-md border border-[#FFF4F2] bg-[#FFF4F2] p-1 px-3"
        onPress={() => setShowPicker(true)}>
        <View className="flex w-full flex-row items-center justify-between">
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#808284"
            value={inputValue}
            editable={false}
            pointerEvents="none"
            showSoftInputOnFocus={false}
            className="flex-1 text-base font-normal text-[#808284]"
          />
          <Clock3 size={20} color="#808284" />
        </View>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default TimeInput;
