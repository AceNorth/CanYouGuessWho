import React, {ReactNode, useRef, useEffect} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/colors';

const CONTAINER_HEIGHT = 60;

export const GuessContainer = ({
  children,
  onPress,
  isSelected,
  backgroundColor,
}: {
  children: ReactNode;
  onPress: () => void;
  isSelected: boolean;
  backgroundColor: string;
}) => {
  const height = useRef(new Animated.Value(CONTAINER_HEIGHT)).current;
  const viewStyle = {
    ...styles.container,
    borderColor: isSelected ? colors.light2 : 'transparent',
    backgroundColor,
    height,
  };

  useEffect(() => {
    if (backgroundColor !== 'white') {
      Animated.timing(height, {
        toValue: CONTAINER_HEIGHT * 1.2,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(height, {
          toValue: CONTAINER_HEIGHT * 0.9,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(height, {
            toValue: CONTAINER_HEIGHT * 1.1,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            Animated.timing(height, {
              toValue: CONTAINER_HEIGHT,
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
    borderWidth: 3,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: CONTAINER_HEIGHT * 1.1,
    marginTop: 5,
    marginHorizontal: 5,
  },
});
