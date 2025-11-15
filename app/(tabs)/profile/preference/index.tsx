import usePersonalizeStore from '@/store/personalizeStore';
import { cn } from '@/utils';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Plus, Trash } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';

export default function PreferenceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    userPreferenceList,
    getUserPreferenceList,
    fetchAllPreferences,
    preferenceList,
    createPreference,
    deleteUserPreferences,
    isLoading,
    error,
  } = usePersonalizeStore();

  // UI States
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPreferenceIdToAdd, setSelectedPreferenceIdToAdd] = useState<number[]>([]);
  const [deletePreferences, setDeletePreferences] = useState<number[]>([]);

  // Initial fetch
  useEffect(() => {
    getUserPreferenceList();
    fetchAllPreferences();

    setSelectedPreferenceIdToAdd(userPreferenceList.map((pref) => pref.preferences_id));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([getUserPreferenceList(), fetchAllPreferences()]);
    setRefreshing(false);
  }, []);

  // Toggle selection for add/delete
  const toggleSelect = (id: number) => {
    setSelectedPreferenceIdToAdd((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleDeleteSelect = (id: number) => {
    setDeletePreferences((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Create Preferences
  const handleNextPreference = async () => {
    if (!selectedPreferenceIdToAdd.length) {
      Toast.warn('Please select at least one preference.');
      return;
    }
    setIsCreating(true);
    try {
      const response = await createPreference(selectedPreferenceIdToAdd);
      if (response.status === 200) {
        Toast.success(response.data?.message || 'Preferences created successfully!');
        setIsVisible(false);
        await getUserPreferenceList();
        setSelectedPreferenceIdToAdd([]);
      }
    } catch (err: any) {
      Toast.error(err?.message || 'Failed to create preferences.');
    } finally {
      setIsCreating(false);
    }
  };

  // Delete Preferences
  const handleDeletePreference = async () => {
    if (!deletePreferences.length) {
      Toast.warn('Please select at least one preference to delete.');
      return;
    }
    try {
      const response = await deleteUserPreferences(deletePreferences);
      if (response.status === 200) {
        Toast.success(response.data?.message || 'Preferences deleted successfully!');
        setIsDeleting(false);
        setDeletePreferences([]);
        await getUserPreferenceList();
      }
    } catch (err: any) {
      Toast.error(err?.message || 'Failed to delete preferences.');
    }
  };

  return (
    <View className="flex-1 bg-[#FBFEFE]" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="h-full flex-1 bg-[#FBFEFE]"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            progressViewOffset={80}
            onRefresh={onRefresh}
            colors={['#F86241']}
          />
        }
        contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 20 }}>
        {/* Header */}
        <View className="mb-3 flex-row items-center gap-3">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="#63707C" />
          </Pressable>
          <Text className="text-lg font-semibold text-[#313131]">Preferences</Text>
        </View>

        {/* Refresh & Error */}
        {error && (
          <View className="items-center justify-center py-4">
            <Text className="text-[#63707C]">{error}</Text>
          </View>
        )}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              progressViewOffset={80}
              onRefresh={onRefresh}
              colors={['#F86241']}
            />
          }
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="#F86241" />
            </View>
          ) : (
            <View className="pt-4">
              {userPreferenceList.length === 0 ? (
                <Text className="text-center text-[#63707C]">
                  No preferences found. Add your favorites!
                </Text>
              ) : (
                <>
                  <Text className="mb-3 text-base font-semibold text-primary">
                    Your Preferences
                  </Text>
                  {userPreferenceList.map((pref, index) => {
                    const selectedForDelete = deletePreferences.includes(pref.preferences_id);
                    return (
                      <View
                        key={index}
                        className={cn(
                          'mb-4 flex-row items-center gap-3 rounded-lg px-4 py-3',
                          isDeleting ? 'bg-primary/10' : 'bg-white shadow-sm',
                          selectedForDelete ? 'border border-primary' : ''
                        )}>
                        {isDeleting && (
                          <Pressable
                            onPress={() => toggleDeleteSelect(pref.preferences_id)}
                            className={cn(
                              'h-[18px] w-[18px] items-center justify-center rounded-sm border border-primary',
                              selectedForDelete && 'bg-primary'
                            )}>
                            {selectedForDelete && <Check size={12} color="#fff" />}
                          </Pressable>
                        )}
                        <Text className="text-base font-medium text-black">
                          {pref.preferences_name}
                        </Text>
                      </View>
                    );
                  })}
                </>
              )}
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View className="absolute bottom-5 left-0 right-0 flex-row justify-center gap-3 px-5">
          {userPreferenceList.length > 0 && (
            <Pressable
              onPress={() => setIsDeleting((prev) => !prev)}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-full border border-primary bg-transparent px-6 py-3">
              {!isDeleting && <Trash size={20} color="#F86241" />}
              <Text className="text-base font-medium text-primary">
                {isDeleting ? 'Cancel' : 'Delete'}
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              if (!isDeleting) setIsVisible(true);
              else handleDeletePreference();
            }}
            disabled={isDeleting && deletePreferences.length === 0}
            className={cn(
              'flex-1 flex-row items-center justify-center gap-2 rounded-full bg-primary px-6 py-3',
              isDeleting && deletePreferences.length === 0 ? 'opacity-50' : ''
            )}>
            {isDeleting ? (
              <>
                <Trash size={20} color="#fff" />
                <Text className="text-base font-medium text-white">
                  Delete ({deletePreferences.length})
                </Text>
              </>
            ) : (
              <>
                <Plus size={20} color="#fff" />
                <Text className="text-base font-medium text-white">Add</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Modal for Adding Preferences */}
        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          swipeDirection={['down']}
          onSwipeComplete={() => setIsVisible(false)}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          animationIn="slideInUp"
          animationOut="slideOutDown">
          <View className="min-h-[85%] rounded-t-[30px] bg-white p-5">
            <Text className="mb-5 text-center text-xl font-semibold">Choose What You Like</Text>
            <ScrollView
              contentContainerStyle={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10,
              }}>
              {preferenceList.map((item, index) => {
                const isSelected = selectedPreferenceIdToAdd.includes(item.id);
                return (
                  <Pressable
                    key={index}
                    onPress={() => toggleSelect(item.id)}
                    className={`flex-row items-center gap-2 rounded-full px-5 py-2 ${
                      isSelected ? 'bg-[#F86241]' : 'bg-[#f6f6f6]'
                    }`}>
                    <Text className={`text-base ${isSelected ? 'text-white' : 'text-[#333]'}`}>
                      {item.name}
                    </Text>
                    <Text className={`text-base ${isSelected ? 'text-white' : 'text-[#333]'}`}>
                      {isSelected ? '✓' : '+'}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable
              onPress={handleNextPreference}
              className="mt-6 h-12 items-center justify-center rounded-full bg-[#F86241]">
              <Text className="text-lg font-semibold text-white">
                {isCreating ? 'Saving...' : `Next (${selectedPreferenceIdToAdd.length})`}
              </Text>
            </Pressable>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
