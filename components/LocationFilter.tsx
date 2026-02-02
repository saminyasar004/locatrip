import { ChevronDown, ChevronUp, MapPin, Target } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface LocationFilterProps {
  locationQuery: string;
  setLocationQuery: (text: string) => void;
  onSelectLocation: (item: any) => void;
  pickedDay?: string | null;
  setPickedDay?: (value: string | null) => void;
  dayItems?: { label: string; value: string }[];
  pickedDistance: string | null;
  setPickedDistance: (value: string | null) => void;
  distanceItems: { label: string; value: string }[];
}

export default function LocationFilter({
  locationQuery,
  setLocationQuery,
  onSelectLocation,
  pickedDay,
  setPickedDay,
  dayItems,
  pickedDistance,
  setPickedDistance,
  distanceItems,
}: LocationFilterProps) {
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [isDistancePickerOpen, setIsDistancePickerOpen] = useState(false);
  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [showLocationList, setShowLocationList] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isLiveLocationLoading, setIsLiveLocationLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const searchLocation = (text: string) => {
    setLocationQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!text || text.trim().length < 1) {
      setLocationResults([]);
      setShowLocationList(false);
      return;
    }

    setLocationLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text
        )}&addressdetails=1&limit=5`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'locatip/1.0 (support@locatip.com)',
            'Accept-Language': 'en',
          },
        });
        const data = await res.json();
        setLocationResults(data);
        setShowLocationList(true);
      } catch (err) {
        console.log('Location search error:', err);
      } finally {
        setLocationLoading(false);
      }
    }, 400);
  };

  const handleLiveLocation = async () => {
    setIsLiveLocationLoading(true);
    try {
      // Use dynamic require to prevent crash if native module isn't linked yet
      let ExpoLocation;
      try {
        ExpoLocation = require('expo-location');
      } catch (e) {
        alert('Location module is not available. Please rebuild the app.');
        setIsLiveLocationLoading(false);
        return;
      }

      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Reverse geocode to get name
      const reverseGeocode = await ExpoLocation.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = reverseGeocode[0];
      const displayName = address
        ? `${address.name || ''} ${address.street || ''} ${address.city || ''}`.trim()
        : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

      onSelectLocation({
        display_name: displayName,
        lat: latitude.toString(),
        lon: longitude.toString(),
      });
    } catch (error) {
      console.log('Error getting live location:', error);
      alert('Could not get your current location. Please try again or search manually.');
    } finally {
      setIsLiveLocationLoading(false);
    }
  };

  return (
    <View className="w-full flex-col gap-3 py-3" style={{ zIndex: 3000 }}>
      {/* Row 1: Full-width Location Search */}
      <View className="relative flex w-full flex-row items-center gap-2">
        <View className="flex h-12 flex-1 flex-row items-center justify-start rounded-lg bg-accent px-3">
          <MapPin color="#63707C" size={20} />
          <TextInput
            className="flex-1 px-2 text-[#63707C] placeholder:text-black"
            placeholder="Location"
            placeholderTextColor="#000000"
            value={locationQuery}
            onChangeText={searchLocation}
          />
          {locationLoading && <ActivityIndicator size="small" color="#F86241" className="mr-2" />}
          <TouchableOpacity onPress={handleLiveLocation} disabled={isLiveLocationLoading}>
            {isLiveLocationLoading ? (
              <ActivityIndicator size="small" color="#F86241" />
            ) : (
              <Target color="#F86241" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {/* Location Autocomplete List */}
        {showLocationList && locationResults.length > 0 && (
          <View
            className="absolute left-0 top-14 z-50 max-h-60 w-full overflow-hidden rounded-lg bg-white shadow-lg"
            style={{ elevation: 5 }}>
            <View className="flex flex-col">
              {locationResults.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="border-b border-gray-100 p-3"
                  onPress={() => {
                    onSelectLocation(item);
                    setShowLocationList(false);
                  }}>
                  <Text className="text-sm text-gray-700">{item.display_name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Row 2: Two columns */}
      <View className="flex w-full flex-row items-center gap-3" style={{ zIndex: 2000 }}>
        {setPickedDay && dayItems && (
          <View className="flex-1" style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={isDayPickerOpen}
              value={pickedDay || null}
              items={dayItems}
              setOpen={setIsDayPickerOpen}
              setValue={(callback) => {
                const value =
                  typeof callback === 'function' ? callback(pickedDay || null) : callback;
                setPickedDay(value);
              }}
              placeholder="All Day"
              style={{
                backgroundColor: '#f8dcd7',
                borderColor: '#f8dcd7',
                minHeight: 40,
              }}
              ArrowDownIconComponent={() => <ChevronDown size={20} color={'#6E6E6E'} />}
              ArrowUpIconComponent={() => <ChevronUp size={20} color={'#6E6E6E'} />}
              dropDownContainerStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#eee',
                borderRadius: 10,
              }}
              labelStyle={{
                color: '#575757',
                fontWeight: '500',
              }}
              selectedItemContainerStyle={{
                backgroundColor: '#f8dcd7',
                borderRadius: 8,
              }}
              closeOnBackPressed={true}
            />
          </View>
        )}

        <View className="flex-1" style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={isDistancePickerOpen}
            value={pickedDistance}
            items={distanceItems}
            setOpen={setIsDistancePickerOpen}
            setValue={(callback) => {
              const value = typeof callback === 'function' ? callback(pickedDistance) : callback;
              setPickedDistance(value);
            }}
            placeholder="10 km"
            style={{
              backgroundColor: '#f8dcd7',
              borderColor: '#f8dcd7',
              minHeight: 40,
            }}
            ArrowDownIconComponent={() => <ChevronDown size={20} color={'#6E6E6E'} />}
            ArrowUpIconComponent={() => <ChevronUp size={20} color={'#6E6E6E'} />}
            dropDownContainerStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#eee',
              borderRadius: 10,
            }}
            labelStyle={{
              color: '#575757',
              fontWeight: '500',
            }}
            selectedItemContainerStyle={{
              backgroundColor: '#f8dcd7',
              borderRadius: 8,
            }}
            closeOnBackPressed={true}
          />
        </View>
      </View>
    </View>
  );
}
