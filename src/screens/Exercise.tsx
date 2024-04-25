import { TouchableOpacity } from "react-native";
import {
  HStack,
  Heading,
  Icon,
  VStack,
  Text,
  Image,
  Box,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";

import Button from "@components/Button";

const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

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
              Puxada Frontal
            </Heading>

            <HStack alignItems="center">
              <BodySVG />
              <Text
                color="gray.200"
                fontSize="lg"
                ml={1}
                textTransform="capitalize"
              >
                costas
              </Text>
            </HStack>
          </HStack>
        </VStack>

      <ScrollView >
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{
              uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
            }}
            alt="Nome no exercício"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

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
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSVG />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Exercise;
