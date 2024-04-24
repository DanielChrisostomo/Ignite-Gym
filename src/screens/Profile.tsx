import React from "react";
import { ScrollView } from "react-native";
import { Center, VStack, Skeleton, Text, Heading } from "native-base";

import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import { TouchableOpacity } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";


const PHOTO_SIZE = 33;

const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = React.useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{paddingBottom: 36 }} >
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/DanielChrisostomo.png" }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="nome" bgColor="gray.600" />
          <Input value="E-mail" bgColor="gray.600" isDisabled/>


          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
            Alterar Senha
          </Heading>

          <Input bgColor="gray.600" placeholder="Senha Antiga" secureTextEntry />

          <Input bgColor="gray.600" placeholder="Nova Senha" secureTextEntry />

          <Input bgColor="gray.600" placeholder="Confirme a nova Senha" secureTextEntry />

          <Button title="Atualizar" mt={4}/>

        </Center>
      </ScrollView>
    </VStack>
  );
};

export default Profile;
