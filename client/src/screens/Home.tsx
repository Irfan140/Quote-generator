import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import getData from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<{
    content: string;
    author: string;
  } | null>(null);

  const onPress = async () => {
    if (!loading) {
      setLoading(true);
      const data = await getData();
      setQuote({ content: data.content, author: data.author });
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-purple-100 to-purple-50 p-6 justify-between">
      {/* Header */}
      <View className="items-center mt-6">
        <Text className="text-3xl font-extrabold text-purple-800 text-center">
          Quote Generator
        </Text>
        <View className="w-24 h-1 bg-purple-500 rounded-full mt-2" />
      </View>

      {/* Quote Card */}
      <View className="bg-white rounded-2xl p-6 shadow-lg mt-10">
        {quote ? (
          <>
            <Text className="text-xl text-gray-800 italic">
              "{quote.content}"
            </Text>
            <Text className="text-right text-gray-600 mt-4 font-semibold">
              — {quote.author}
            </Text>
          </>
        ) : (
          <Text className="text-center text-gray-500 text-lg">
            Click Generate to get a random quote from the backend.
          </Text>
        )}
      </View>

      {/* Button */}
      <View className="items-center mt-10">
        <Pressable
          className={`bg-purple-600 rounded-full px-6 py-3 ${loading ? 'opacity-50' : ''}`}
          onPress={onPress}
          disabled={loading}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Loading...' : 'Generate'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
