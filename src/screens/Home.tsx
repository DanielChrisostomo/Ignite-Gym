import React from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text, useToast } from "native-base";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import ExerciseCard from "@components/ExerciseCard";
import Group from "@components/Group";
import HomeHeader from "@components/HomeHeader";
import { Loading } from "@components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [groups, setGroups] = React.useState<string[]>([]);
  const [exercises, setExercises] = React.useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = React.useState("antebraço");

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetail (exerciseId: string){
    navigation.navigate("exercise", { exerciseId }) 
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get("/groups");

      setGroups(data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares."

      toast.show({
        title: title,
        placement: "top",
        bgColor: "red.500"
      })
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os exercícios."

      toast.show({
        title: title,
        placement: "top",
        bgColor: "red.500"
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(()=> {
    fetchGroups()
  },[])

  useFocusEffect(React.useCallback(() => {
    fetchExercisesByGroup()
  },[groupSelected]))

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

      {isLoading ? <Loading /> : <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseCard onPress={() => handleOpenExerciseDetail(item.id)} data={item}  />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>}
    </VStack>
  );
};

export default Home;
