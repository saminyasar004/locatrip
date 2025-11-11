import { Check } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Props = {
  list: string[];
  title?: string;
  subtitle?: string;
  placeholder?: string;
  isMulti?: boolean;
  value?: string | number;
  values?: string[] | number[];
  onChange?: (value: any) => void;
};

type Data = {
  label: string;
  value: number;
};

const MultiSelectComponent = ({
  list,
  title,
  subtitle,
  placeholder,
  isMulti: isMulti = false,
  value,
  values,
  onChange,
}: Props) => {
  const [data, setData] = useState<Data[]>([]);
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setData(list.map((l, i) => ({ label: l, value: i })));
  }, [list]);

  const renderItem = (item: Data) => {
    const isSelected = selectedMulti.includes(item.value);

    if (isMulti) {
      return (
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
          onPress={() => {
            // Toggle selection
            // if (isSelected) {
            // 	setSelected(
            // 		selected.filter((val) => val !== item.value)
            // 	);
            // } else {
            // 	setSelected([...selected, item.value]);
            // }

            let updatedSelection: number[];
            if (isSelected) {
              updatedSelection = selectedMulti.filter((val) => val !== item.value);
            } else {
              updatedSelection = [...selectedMulti, item.value];
            }
            setSelectedMulti(updatedSelection);

            // Call parent's onChange with label array
            if (onChange) {
              const selectedLabels = updatedSelection
                .map((val) => data.find((d) => d.value === val)?.label)
                .filter(Boolean) as string[];
              onChange(selectedLabels);
            }
          }}
          className="px-4 py-3">
          <View className="flex-row items-center justify-start gap-3">
            {isSelected ? (
              <View className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary">
                <Check size={14} color="#fff" />
              </View>
            ) : (
              <View className="flex h-5 w-5 items-center justify-center rounded-sm border border-[#CCCCCC] bg-white"></View>
            )}
            <Text className="text-base text-foreground">{item.label}</Text>
          </View>
        </Pressable>
      );
    } else {
      return (
        <View className="flex-row items-center justify-between rounded-lg px-4 py-3">
          <Text className="text-base text-foreground">{item.label}</Text>
        </View>
      );
    }
  };

  // Generate text for selected items
  const getSelectedText = () => {
    if (selectedMulti.length === 0) return 'Select items';
    const selectedLabels = selectedMulti
      .map((val) => data.find((item) => item.value === val)?.label)
      .filter(Boolean)
      .join(', ');
    return selectedLabels.length > 20 ? `${selectedLabels.slice(0, 20)}...` : selectedLabels;
  };

  if (isMulti) {
    return (
      <View className="w-full gap-2">
        <Text className="text-title font-semibold">
          {title}
          {subtitle && <Text className="font-normal text-[#808080]"> {subtitle}</Text>}
          <Text className="font-normal text-[#808080]"> ({selectedMulti.length} Selected)</Text>
        </Text>
        <Dropdown
          style={{
            borderWidth: 1,
            borderRadius: 8,
            paddingVertical: 14,
            paddingHorizontal: 10,
            borderColor: '#CCCCCC',
            backgroundColor: '#FFF4F2',
          }}
          activeColor="#FFF4F2"
          placeholderStyle={{
            fontSize: 14,
            color: '#999999',
          }}
          selectedTextStyle={{ fontSize: 14, color: '#666666' }}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={getSelectedText()} // Use placeholder to show selected items
          value={value} // Keep null to avoid single-select behavior
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: Data) => {
            if (!isMulti) {
              onChange && onChange(item.label); // Pass selected label for single select
            }
          }}
          searchPlaceholder="Search..."
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          selectedTextProps={{
            numberOfLines: 1,
          }}
        />
      </View>
    );
  } else {
    useEffect(() => {
      // Sync selectedSingle when parent value changes
      if (value !== undefined && typeof value === 'string') {
        const found = data.find((d) => d.label === value);
        setSelectedSingle(found ? found.value : null);
      }
    }, [value, data]);

    return (
      <View className="w-full gap-2">
        <Text className="text-title font-semibold">
          {title}
          {subtitle && <Text className="font-normal text-[#808080]"> {subtitle}</Text>}
        </Text>
        <Dropdown
          style={{
            borderRadius: 8,
            paddingVertical: 14,
            paddingHorizontal: 10,
            backgroundColor: '#FFF4F2',
          }}
          activeColor="#FFF4F2"
          placeholderStyle={{ fontSize: 16, color: '#888' }}
          selectedTextStyle={{ fontSize: 14, color: '#111' }}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder || 'Select item'}
          value={selectedSingle}
          searchPlaceholder="Search..."
          onChange={(item: Data) => {
            setSelectedSingle(item.value);
            onChange && onChange(item.label); // ✅ now the parent gets the label (string)
          }}
          renderItem={renderItem}
        />
      </View>
    );
  }
};

export default MultiSelectComponent;
