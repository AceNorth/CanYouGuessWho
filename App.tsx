import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import {GuessContainer} from './components/GuessContainer';
import {colors} from './constants/colors';

enum ImageDimensionOptions {
  Small = 256,
  Medium = 512,
  Large = 1024,
}

const IMAGE_DIMENSION: ImageDimensionOptions = ImageDimensionOptions.Small;

const fetchImageUrlForPrompt = async (prompt: string) => {
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
  'River',
  'Noah',
  'Ezra',
  'Micah',
  'James',
  'Silas',
  'Charlie',
  'Cameron',
  'Reese',
  'Drew',
];

const adjectives = [
  'sociable',
  'big-headed',
  'optimistic',
  'chatty',
  'outgoing',
  'arrogant',
  'nasty',
  'unpleasant',
  'modest',
  'generous',
  'polite',
  'unadventurous',
  'unambitious',
  'unenthusiastic',
  'unfriendly',
  'unhelpful',
  'affectionate',
  'frightening',
  'brave',
  'cheerful',
  'confident',
  'determined',
  'easygoing',
  'meticulous',
];

const jobs = [
  'probably a vampire',
  'shoplifts',
  'a social media influencer',
  'a model',
  'an animal trainer',
  'a movie star',
  'the self-described "proud parent of two fur babies"',
  'terrifying',
  'a dentist',
  'an archery enthusiast',
  'a historical reenactor',
  'rides a motorcycle',
  'robs banks',
];

const generateFourNewPeople = () => {
  const selectedNames: string[] = [];
  const selectedAdjectives: string[] = [];
  const selectedJobs: string[] = [];
  const arrayOfPeople = [];

  while (selectedNames.length < 4) {
    const randomName = getRandomOption(names);
    if (!selectedNames.includes(randomName)) {
      selectedNames.push(randomName);
    }
  }

  while (selectedAdjectives.length < 4) {
    const randomAdjective = getRandomOption(adjectives);
    if (!selectedAdjectives.includes(randomAdjective)) {
      selectedAdjectives.push(randomAdjective);
    }
  }

  while (selectedJobs.length < 4) {
    const randomJob = getRandomOption(jobs);
    if (!selectedJobs.includes(randomJob)) {
      selectedJobs.push(randomJob);
    }
  }

  let currentIndex = 0;

  while (currentIndex < 4) {
    arrayOfPeople.push({
      name: selectedNames[currentIndex],
      adjective1: selectedAdjectives[currentIndex],
      adjective2: selectedJobs[currentIndex],
    });
    currentIndex += 1;
  }
  return arrayOfPeople;
};

const getRandomOption = (wordArr: string[]) => {
  return wordArr[Math.floor(Math.random() * wordArr.length)];
};

const determineColorOfGuessButton = (
  isSelected: boolean,
  isCorrect: boolean,
  hasChecked: boolean,
) => {
  if (isSelected) {
    if (hasChecked) {
      if (isCorrect) {
        return colors.light1;
      }
      return colors.medium;
    }
    return colors.gray;
  } else {
    if (hasChecked && isCorrect) {
      return colors.light1;
    }
    return colors.gray;
  }
};

const generatePrompt = (
  name: string,
  adjective1: string,
  adjective2: string,
) => {
  return `A very detailed head-and-shoulders view of a human Pixar character named
    ${name}, who is ${adjective1} and ${adjective2}.`;
};

interface Person {
  name: string;
  adjective1: string;
  adjective2: string;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const [possiblePeople, setPossiblePeople] = useState<Person[]>([]);
  const [correctAnswerIndex, setSelectedPersonIndex] = useState(-1);
  const [guessIndex, setGuessIndex] = useState(-1);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = async () => {
    setLoading(true);
    const newPeople = generateFourNewPeople();
    setPossiblePeople(newPeople);
    const newSelectedPersonIndex = Math.floor(Math.random() * 4);
    setSelectedPersonIndex(newSelectedPersonIndex);
    const selectedPerson = newPeople[newSelectedPersonIndex];
    setGuessIndex(-1);
    const prompt = generatePrompt(
      selectedPerson.name,
      selectedPerson.adjective1,
      selectedPerson.adjective2,
    );
    const url = await fetchImageUrlForPrompt(prompt);
    setImageUrl(url);
    setLoading(false);
  };

  const guess = (index: number) => {
    setGuessIndex(index);
  };

  return (
    <SafeAreaView style={styles.flexContainer}>
      <LinearGradient
        colors={[colors.medium, colors.dark1]}
        style={styles.flexContainer}>
        <View style={styles.flexContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Can you guess who this is?</Text>
          </View>
          <View style={styles.imageContainer}>
            {loading ? (
              <ActivityIndicator size={'large'} />
            ) : (
              <Image style={styles.image} source={{uri: imageUrl!}} />
            )}
          </View>
          <View style={styles.flexContainer4}>
            {possiblePeople.map((person, index) => {
              return (
                <GuessContainer
                  backgroundColor={determineColorOfGuessButton(
                    guessIndex === index,
                    correctAnswerIndex === index,
                    guessIndex > -1,
                  )}
                  isSelected={guessIndex === index}
                  onPress={() => guess(index)}>
                  <Text style={styles.guessText}>
                    {person.name}, who is {person.adjective1} and{' '}
                    {person.adjective2}
                  </Text>
                </GuessContainer>
              );
            })}
            <Button
              onPress={startNewRound}
              title="Play Again"
              disabled={guessIndex < 0}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    display: 'flex',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    display: 'flex',
    flex: 1,
  },
  flexContainer4: {
    display: 'flex',
    flex: 4,
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    borderRadius: 200,
    borderWidth: 10,
    borderColor: colors.light2,
  },
  headerText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 26,
    fontFamily: 'Futura',
  },
  guessText: {
    fontSize: 16,
    fontFamily: 'Futura',
  },
  animation: {
    position: 'absolute',
    bottom: -200,
  },
});

export default App;
