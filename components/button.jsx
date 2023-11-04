import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function Button(props) {
  const { onPress, title = 'Save', icon } = props;
  return (
    <Pressable style={[styles.button, props.style]} onPress={onPress}>
      {icon && <Text>{icon}</Text>}
      <Text style={[styles.text, props.textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 0,
    backgroundColor: 'hsl(222.2,47.4%,11.2%)',
  },
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
