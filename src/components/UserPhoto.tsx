import { Image, IImageProps } from 'native-base'

type Props = IImageProps & {
    size: number
}

const UserPhoto = ({ size, ...rest }: Props) => {
  return (
    <>
      <Image height={size} width={size} rounded="full" borderWidth={2} borderColor="gray.400" {...rest} />
    </>
  )
}

export default UserPhoto
