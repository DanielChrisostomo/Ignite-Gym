import { TouchableOpacity } from "react-native";
import { HStack, Heading, Text, VStack, Icon } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { api } from "@services/api";

import { useAuth } from "@hooks/useAuth";

import UserPhoto from "./UserPhoto";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png"

const HomeHeader = () => {

  const { user, signOut } = useAuth()

  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={ user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhotoImg}
        alt="imagem do usuário"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

export default HomeHeader;
