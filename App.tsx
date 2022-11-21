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
import {names, adjectives, quirks} from './constants/peopleDescriptors';

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

const generateFourNewPeople = () => {
  const selectedNames: string[] = [];
  const selectedAdjectives: string[] = [];
  const selectedQuirks: string[] = [];
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

  while (selectedQuirks.length < 4) {
    const randomQuirk = getRandomOption(quirks);
    if (!selectedQuirks.includes(randomQuirk)) {
      selectedQuirks.push(randomQuirk);
    }
  }

  let currentIndex = 0;

  while (currentIndex < 4) {
    arrayOfPeople.push({
      name: selectedNames[currentIndex],
      adjective: selectedAdjectives[currentIndex],
      quirk: selectedQuirks[currentIndex],
    });
    currentIndex += 1;
  }
  return arrayOfPeople;
};

const getRandomOption = (wordArr: string[]) => {
  return wordArr[Math.floor(Math.random() * wordArr.length)];
};

export const determineColorOfGuessButton = (
  isSelected: boolean,
  isCorrect: boolean,
  hasChecked: boolean,
) => {
  /*
    The guess buttons are gray by default, whether selected or unselected.
    Once the user checks their answer:
      if they've selected the correct answer, it turns gold.
      if they've selected the incorrect answer, it turns red and the correct answer turns green.
  */
  if (isSelected) {
    if (hasChecked) {
      if (isCorrect) {
        return colors.gold;
      }
      return colors.red;
    }
    return colors.gray;
  } else {
    if (hasChecked && isCorrect) {
      return colors.light1;
    }
    return colors.gray;
  }
};

export const generatePrompt = (
  name: string,
  adjective: string,
  quirk: string,
) => {
  return `A very detailed head-and-shoulders view of a human Pixar character named
    ${name}, who is ${adjective} and ${quirk}.`;
};

interface Person {
  name: string;
  adjective: string;
  quirk: string;
}

export const App = () => {
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
      selectedPerson.adjective,
      selectedPerson.quirk,
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
                  key={person.name}
                  backgroundColor={determineColorOfGuessButton(
                    guessIndex === index,
                    correctAnswerIndex === index,
                    guessIndex > -1,
                  )}
                  isSelected={guessIndex === index}
                  onPress={() => guess(index)}>
                  <Text style={styles.guessText}>
                    {person.name}, who is {person.adjective} and {person.quirk}
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
});

export default App;
