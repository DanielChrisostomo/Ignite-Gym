import React from "react";
import { Heading, VStack, SectionList, Text } from "native-base";

import HistoryCard from "@components/HistoryCard";
import ScreenHeader from "@components/ScreenHeader";

const History = () => {
  const [exercises, setExercises] = React.useState([
    {
    title: "24.04.2024",
    data: ["Puxada Frontal", "Remada unilateral"]
  },
  {
    title: "27.08.2022",
    data: ["Puxada Frontal"]
  }
])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <HistoryCard />
        )}
        renderSectionHeader={({section}) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
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
      />

    </VStack>
  )
}

export default History
