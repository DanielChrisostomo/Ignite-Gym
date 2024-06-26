import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { HistoryByDayDTO } from "@dtos/HistoryGroupByDayDTO";

import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";
import { Loading } from "@components/Loading";


const History = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [exercises, setExercises] = React.useState<HistoryByDayDTO[]>([])

const toast = useToast()

async function fetchHistory() {
  try {
    setIsLoading(true)
    const { data } = await api.get("/history")
    setExercises(data)
  } catch (error) {
    const isAppError = error instanceof AppError
    const title = isAppError ? error.message : "Não foi possível registrar o histórico."

    toast.show({
      title,
      placement: "top",
      bgColor: "red.500"
    })
  } finally {
    setIsLoading(false)
  }
}

useFocusEffect(React.useCallback(() => {
  fetchHistory()
},[]))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? <Loading /> : <SectionList 
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HistoryCard data={item} />
        )}
        renderSectionHeader={({section}) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent:"center"}}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center" >
            Não há exercícios registrados ainda. {"\n"}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />}

    </VStack>
  )
}

export default History
