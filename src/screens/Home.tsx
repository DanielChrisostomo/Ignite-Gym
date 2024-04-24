import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text } from "native-base";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import ExerciseCard from "@components/ExerciseCard";
import Group from "@components/Group";
import HomeHeader from "@components/HomeHeader";

const Home = () => {
  const [groups, setGroups] = React.useState(["Costa","Bíceps","Tríceps","Ombro",]);
  const [exercises, setExercises] = React.useState(["Puxada Frontal", "Remada Curvada", "Remada Unilateral", "Levantamento Terra",]);
  const [groupSelected, setGroupSelected] = React.useState("costa");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetail (){
    navigation.navigate("exercise") 
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ExerciseCard onPress={handleOpenExerciseDetail} />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};

export default Home;