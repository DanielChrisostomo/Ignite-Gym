import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons"

type Props = TouchableOpacityProps & {};

const ExerciseCard = ({ ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}  >
      <HStack bgColor="gray.500" p={2} pr={4} rounded="md" mb={3} alignItems="center">
        <Image
          source={{
            uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
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
                Remada Unilateral
            </Heading>
            <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>3 séries x 12 Repetições</Text>
          </VStack>


            <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />

      </HStack>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
