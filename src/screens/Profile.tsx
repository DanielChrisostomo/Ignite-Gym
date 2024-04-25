import React from "react";
import { TouchableOpacity } from "react-native";
import { Center, VStack, Skeleton, Text, Heading, useToast, ScrollView } from "native-base";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system'

import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import Input from "@components/Input";
import Button from "@components/Button";

import { FileInfo } from "expo-file-system";


const PHOTO_SIZE = 33;

const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = React.useState(false);
  const [userPhoto, setUserPhoto] = React.useState("https://github.com/DanielChrisostomo.png")

  const toast = useToast()

  async function handleUserPhotoSelect () {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         quality: 1,
         aspect: [4,4],
         allowsEditing: true,
       });
   
       if(photoSelected.canceled) return

       if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) as FileInfo
        console.log(photoInfo)
        if(photoInfo.size && (photoInfo.size / 1024 / 1024 ) > 5 ) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma imagem de até 5MB",
            placement: "top",
            bgColor: "red.500"
          })
        }

        setUserPhoto(photoSelected.assets[0].uri);
       }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false);
    }

  }

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
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
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


          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
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
