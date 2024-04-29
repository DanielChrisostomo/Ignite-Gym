import { Center, Spinner } from "native-base";

export function Loading (){
    return (
        <Center flex={1} bg={"info.500"} bgColor={"gray.700"}>
          <Spinner color={"green.500"} />
        </Center>
    );
}
