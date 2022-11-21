import {determineColorOfGuessButton} from './GuessWhoGame';
import {colors} from '../../constants/colors';

describe('determineColorOfGuessButton function', () => {
  describe('if the user has selected the given option', () => {
    const isSelected = true;
    const hasChecked = true;
    test(' and is correct, the button should turn gold', () => {
      const isCorrect = true;
      const color = determineColorOfGuessButton(
        isSelected,
        isCorrect,
        hasChecked,
      );
      expect(color).toBe(colors.gold);
    });
    test(' and is incorrect, the button should turn red', () => {
      const isCorrect = false;
      const color = determineColorOfGuessButton(
        isSelected,
        isCorrect,
        hasChecked,
      );
      expect(color).toBe(colors.red);
    });
  });

  describe('if the user has not selected the given option', () => {
    const isSelected = false;
    test(' and it is correct, the button should turn light1', () => {
      const isCorrect = true;
      const hasChecked = true;
      const color = determineColorOfGuessButton(
        isSelected,
        isCorrect,
        hasChecked,
      );
      expect(color).toBe(colors.light1);
    });
    test(' and it is incorrect, the button should be gray', () => {
      const isCorrect = false;
      const hasChecked = true;
      const color = determineColorOfGuessButton(
        isSelected,
        isCorrect,
        hasChecked,
      );
      expect(color).toBe(colors.gray);
    });

    test(' and has not selected any options, the button should be gray', () => {
      const hasChecked = false;
      const colorForCorrectOption = determineColorOfGuessButton(
        isSelected,
        true,
        hasChecked,
      );
      expect(colorForCorrectOption).toBe(colors.gray);

      const colorForIncorrectOption = determineColorOfGuessButton(
        isSelected,
        false,
        hasChecked,
      );
      expect(colorForIncorrectOption).toBe(colors.gray);
    });
  });
});
