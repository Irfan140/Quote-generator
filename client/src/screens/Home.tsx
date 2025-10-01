import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import getData from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<{ content: string } | null>(null);
  const [anime, setAnime] = useState<string>('');

  const onPress = async () => {
    if (!loading && anime.trim() !== '') {
      setLoading(true);
      try {
        const data = await getData(anime.trim());
        setQuote({ content: data.quote });
      } catch (err) {
        setQuote({ content: 'Error fetching quote' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-purple-100 to-purple-50 p-6 justify-between">
      {/* Header */}
      <View className="items-center mt-6">
        <Text className="text-3xl font-extrabold text-purple-800 text-center">
          Anime Quote Generator
        </Text>
        <View className="w-24 h-1 bg-purple-500 rounded-full mt-2" />
      </View>

      {/* Anime Input */}
      <View className="mt-6">
        <Text className="text-gray-700 mb-2 font-semibold">
          Enter Anime Name:
        </Text>
        <TextInput
          className="bg-white rounded-xl p-3 border border-gray-300"
          placeholder="e.g:  Naruto"
          value={anime}
          onChangeText={setAnime}
          // or
          // onChangeText={(text) => setAnime(text)}
        />
      </View>

      {/* Quote Card */}
      <View className="bg-white rounded-2xl p-6 shadow-lg mt-6 flex-1 justify-center">
        {quote ? (
          <>
            <Text className="text-xl text-gray-800 italic">
              "{quote.content}"
            </Text>
            <Text className="text-right text-gray-600 mt-4 font-semibold">
              — No author details
            </Text>
          </>
        ) : (
          <Text className="text-center text-gray-500 text-lg">
            Enter an anime name above and click Generate to get a quote.
          </Text>
        )}
      </View>

      {/* Button */}
      <View className="items-center mt-6">
        <Pressable
          className={`bg-purple-600 rounded-full px-6 py-3 ${loading ? 'opacity-50' : ''}`}
          onPress={onPress}
          disabled={loading || anime.trim() === ''}
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
