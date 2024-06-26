import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, VStack, Text, Image, Box, ScrollView, useToast} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";

import Button from "@components/Button";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string
}

const Exercise = () => {
  const [sendingRegister, setSendingRegister] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [exercise, setExercise] = React.useState<ExerciseDTO>({} as ExerciseDTO)
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps

  const toast = useToast();

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails( exerciseId: string ) {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercício."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500"
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true)
      await api.post("/history", { exercise_id :exerciseId })

      toast.show({
        title: "Parabéns! Exercício registrado no seu histórico.",
        placement: "top",
        bgColor: "green.700"
      })

      navigation.navigate("history")
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível registrar o exercício."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500"
      })
    } finally {
      setSendingRegister(false)
    }
  }

  React.useEffect(()=> {
    fetchExerciseDetails(exerciseId)
  },[exerciseId])

  return (
    <VStack flex={1}>
        <VStack px={8} bg="gray.600" pt={12}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <HStack
            justifyContent="space-between"
            mt={4}
            mb={8}
            alignItems="center"
          >
            <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily="heading">
              {exercise.name}
            </Heading>

            <HStack alignItems="center">
              <BodySVG />
              <Text
                color="gray.200"
                fontSize="lg"
                ml={1}
                textTransform="capitalize"
              >
               {exercise.group}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        {isLoading ? <Loading /> : <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden" >
          <Image
            w="full"
            h={80}
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
            }}
            alt="Nome no exercício"
            resizeMode="cover"
          />
          </Box>

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSVG />
                <Text color="gray.200" ml={2}>
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSVG />
                <Text color="gray.200" ml={2}>
                {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" isLoading={sendingRegister} onPress={handleExerciseHistoryRegister} />
          </Box>
        </VStack>}
    </VStack>
  );
};

export default Exercise;
