import React, {ReactNode, useRef, useEffect} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../constants/colors';

const BASE_HEIGHT = 60;

export const GuessButton = ({
  backgroundColor,
  children,
  onPress,
}: {
  backgroundColor: string;
  children: ReactNode;
  onPress: () => void;
}) => {
  const height = useRef(new Animated.Value(BASE_HEIGHT)).current;
  const viewStyle = {
    ...styles.container,
    backgroundColor,
    height,
  };

  useEffect(() => {
    if (backgroundColor !== colors.gray) {
      Animated.timing(height, {
        toValue: BASE_HEIGHT * 1.2,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(height, {
          toValue: BASE_HEIGHT * 0.9,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(height, {
            toValue: BASE_HEIGHT * 1.1,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            Animated.timing(height, {
              toValue: BASE_HEIGHT,
              duration: 200,
              useNativeDriver: false,
            }).start();
          });
        });
      });
    }
  }, [backgroundColor, height]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outerContainer}>
        <Animated.View style={viewStyle}>{children}</Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: BASE_HEIGHT * 1.1,
    marginBottom: 10,
  },
});
