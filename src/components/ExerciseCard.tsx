import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons"
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

const ExerciseCard = ({data ,...rest }: Props) => {

  return (
    <TouchableOpacity {...rest}  >
      <HStack bgColor="gray.500" p={2} pr={4} rounded="md" mb={3} alignItems="center">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Imagem do exercício"
          height={16}
          width={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

          <VStack flex={1}>
            <Heading fontSize="lg" color="white" fontFamily="heading">
                {data.name}
            </Heading>
            <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>{data.series} séries x {data.repetitions} Repetições</Text>
          </VStack>


            <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />

      </HStack>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
