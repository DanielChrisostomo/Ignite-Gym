import React from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView, useToast, Box } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

import LogoSVG from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { AppError } from "@utils/AppError";

import Input from "@components/Input";
import Button from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("informe o nome."),
  email: yup.string().required("Informe o email.").email("E-mail inválido"), 
  password: yup.string().required("Informe a senha.").min(6, "a senha deve ter pelo menos 6 dígitos"),
  password_confirm: yup.string().required("Confirme da senha.").oneOf([yup.ref("password")], "A confirmação da senha não confere")
})

const SignUp = () => {
  
  const [isLoading, setIsLoading] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation();
  
  const toast = useToast();
  const { signIn } = useAuth()

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {

      setIsLoading(true)
      await api.post("/users", { name, email, password });
      await signIn(email, password)

    } catch (error) {

        setIsLoading(false)
        const isAppError = error instanceof AppError; 
        const title = isAppError ? error.message: "Não foi possível criar a conta. Tente novamente mais tarde."

        return toast.show({
         title: title,
         placement: "top",
         bgColor: "red.500"
       })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Text>Ola mundo</Text>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSVG />
          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color={"gray.100"}
            fontSize={"xl"}
            mb={6}
            fontFamily="heading"
          >
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Nome" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
};

export default SignUp;
