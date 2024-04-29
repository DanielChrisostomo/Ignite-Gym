import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@hooks/useAuth";

import LogoSVG from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import Input from "@components/Input";
import Button from "@components/Button";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
};

const logInScheme = yup.object({
  email: yup.string().required("Informe o email.").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "a senha deve ter pelo menos 6 dígitos"),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(logInScheme),
  });

  const toast = useToast();

  async function handleLogIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password);
      setIsLoading(false)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde.";

      setIsLoading(false)
      return toast.show({
        title: title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
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
            Acesse sua conta
          </Heading>

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
                onSubmitEditing={handleSubmit(handleLogIn)}
                returnKeyType="send"
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleLogIn)} isLoading={isLoading} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" mb={3} fontSize="sm" fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar Conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignIn;
