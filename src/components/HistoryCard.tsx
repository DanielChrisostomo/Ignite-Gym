import { HistoryDTO } from '@dtos/HistoryDTO'
import { HStack, Heading, Text, VStack } from 'native-base'
import React from 'react'

type Props = {
  data: HistoryDTO
}

const HistoryCard = ( { data }: Props) => {
  return (
    <HStack w="full" px={5} py={4} mb={3} bgColor="gray.600" rounded="md" alignItems="center" justifyContent="space-between">
        <VStack mr={5} flex={1}>
            <Heading color="white" fontSize="md" textTransform="capitalize" fontFamily="heading" numberOfLines={1}>{data.group}</Heading>
            <Text color="gray.100" fontSize="lg" numberOfLines={1}>{data.name}</Text>
        </VStack>
        
        <Text color="gray.300" fontSize="md">{data.hour}</Text>
    </HStack>
  )
}

export default HistoryCard
