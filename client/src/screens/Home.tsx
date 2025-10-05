import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import getData from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<{ content: string; author: string } | null>(null);
  const [anime, setAnime] = useState<string>('');

  const onPress = async () => {
    if (!loading && anime.trim() !== '') {
      setLoading(true);
      try {
        const data = await getData(anime.trim());
        setQuote({ content: data.quote, author: data.author });
      } catch (err) {
        setQuote({ content: 'Error fetching quote', author: 'NA' });
      } finally {
        setLoading(false);
      }
    }
  };

  const onReset = () => {
    setQuote(null);
    setAnime('');
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

      {/* Anime Input */}
      <View className="mt-6">
        <Text className="text-gray-700 mb-2 font-semibold">Enter Person Name:</Text>
        <TextInput
          className="bg-white rounded-xl p-3 border border-gray-300"
          placeholder="e.g: Gandhi, Ronaldo etc"
          value={anime}
          onChangeText={setAnime}
        />
      </View>

      {/* Quote Card */}
      <View className="bg-white rounded-2xl p-6 shadow-lg mt-6 flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={true}
        >
          {quote ? (
            <>
              <Text className="text-xl text-gray-800 italic">"{quote.content}"</Text>
              <Text className="text-right text-gray-600 mt-4 font-semibold">
                - {quote.author}
              </Text>
            </>
          ) : (
            <Text className="text-center text-gray-500 text-lg">
              Enter an anime name above and click Generate to get a quote.
            </Text>
          )}
        </ScrollView>
      </View>

      {/* Buttons */}
      <View className="items-center mt-6 flex-row justify-center space-x-4">
        <Pressable
          className={`bg-green-600 rounded-full px-6 py-3 ${loading ? 'opacity-50' : ''}`}
          onPress={onPress}
          disabled={loading || anime.trim() === ''}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Loading...' : 'Generate'}
          </Text>
        </Pressable>

        <Pressable
          className="bg-red-600 rounded-full px-6 py-3 ml-4"
          onPress={onReset}
        >
          <Text className="text-white font-bold text-lg">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
