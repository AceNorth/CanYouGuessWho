/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';

/*
  TODO: Type as 256, 512 or 1024
*/
const IMAGE_DIMENSION = 256;

import {Colors} from 'react-native/Libraries/NewAppScreen';

const fetchImageUrlForPrompt = async prompt => {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Config.API_TOKEN}`,
    },
    body: JSON.stringify({
      prompt,
      size: `${IMAGE_DIMENSION}x${IMAGE_DIMENSION}`,
    }),
  });
  const json = await res.json();
  return json.data[0].url;
};

const names = [
  'Hank',
  'Jacques',
  'Eddie',
  'Andy',
  'Bernard',
  'Dominic',
  'Pax',
  'Ever',
  'Lennox',
  'Hartley',
  'Kit',
  'Hudson',
  'Mason',
  'Logan',
  'Peyton',
  'Emerson',
  'Winter',
  'Marlowe',
  'Lennon',
  'Frankie',
  'Quincy',
  'Sage',
  'River',
  'Noah',
  'Ezra',
  'Micah',
  'James',
  'Silas',
  'Andi',
  'Rori',
  'Charlie',
  'Cameron',
  'Reese',
  'Drew',
];

const adjectives = [
  'miserly',
  'hideous',
  'gorgeous',
  'nebulous',
  'fantastic',
  'cannibalistic',
  'fearful',
  'overbearing',
  'kind',
  'a liar',
];

const generatePeople = (numberToGenerate = 1) => {
  let numberGenerated = 0;
  const arrayOfPeople = [];
  while (numberGenerated < numberToGenerate) {
    arrayOfPeople.push({
      name: getRandomWord(names),
      adjective1: getRandomWord(adjectives),
      adjective2: getRandomWord(adjectives),
    });
    numberGenerated += 1;
  }
  return arrayOfPeople;
};

const getRandomWord = wordArr => {
  return wordArr[Math.floor(Math.random() * wordArr.length)];
};

const NUMBER_OF_OPTIONS = 4;

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const [possiblePeople, setPossiblePeople] = useState(
    generatePeople(NUMBER_OF_OPTIONS),
  );
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(
    Math.floor(Math.random() * NUMBER_OF_OPTIONS),
  );
  const selectedPerson = possiblePeople[selectedPersonIndex];

  const prompt = `A very detailed head-and-shoulders view of a human Pixar character named ${selectedPerson.name}, who is ${selectedPerson.adjective1} and ${selectedPerson.adjective2}, dark background`;

  const fetchThing = async () => {
    setLoading(true);
    const url = await fetchImageUrlForPrompt(prompt);
    setLoading(false);
    setImageUrl(url);
  };

  const reroll = () => {
    setPossiblePeople(generatePeople(NUMBER_OF_OPTIONS));
    setSelectedPersonIndex(Math.floor(Math.random() * NUMBER_OF_OPTIONS));
  };

  const backgroundStyle = {
    height: '100%',
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button onPress={fetchThing} title="Fetch" disabled={loading} />
        <Button onPress={reroll} title="reroll" />
        <View style={styles.imageContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Image style={styles.image} source={{uri: imageUrl}} />
          )}
        </View>
        {possiblePeople.map(person => {
          return (
            <Text>
              {person.name}, who is {person.adjective1} and {person.adjective2}
            </Text>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: IMAGE_DIMENSION * 1.1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: IMAGE_DIMENSION,
    height: IMAGE_DIMENSION,
  },
});

export default App;
