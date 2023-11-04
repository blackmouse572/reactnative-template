import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/button';
import useFetchTodo from '../../hooks/useFetchTodos';

function HomePage({ navigation }) {
  const { refetch, isLoading, error, todos } = useFetchTodo();

  const renderItem = useMemo(() => {
    if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;
    return (
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            {index}. {item.title}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  }, [isLoading, error, todos]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>{renderItem}</View>
      <View style={styles.footer}>
        <Button style={styles.footerLeft} title={'Go to Setting'} onPress={() => navigation.navigate('Setting')} />
        <Button
          style={styles.footerRight}
          title={'Refetch'}
          onPress={() => refetch()}
          textStyle={styles.footerRightText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    display: 'flex',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  item: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 1,
  },
  footerRightText: {
    color: 'black',
  },
});

export default HomePage;
