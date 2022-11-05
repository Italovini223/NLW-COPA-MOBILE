import {Button as ButtonNativeBase, Text, IButtonProps} from 'native-base'
interface props extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}
export function Button({title, type = 'PRIMARY', ...rest}: props){
  return(
    <ButtonNativeBase
      w="full"
      h={14}
      {...rest}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600'
      }}
      _loading={{
        _spinner: {color: 'black'}
      }}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === 'SECONDARY' ? 'white' : 'black'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}