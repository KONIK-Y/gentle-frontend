import {
  Box,
  Flex,
  Avatar,
  Button,
  Text,
  Menu,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaRegBell } from 'react-icons/fa';
import { UserInformation } from '@/types/DataModel';
import { FiHome } from 'react-icons/fi';
import { use, useContext } from 'react';
import { LoginUserContext } from '@/contexts/UserInfoContext';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { RoomContext } from '@/contexts/RoomContext';

interface Props {
  children: React.ReactNode
}

export default function CommonHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {roomCtx, setRoomMetaInfo} = useContext(RoomContext) || {};
  const { setLoginUser } = useContext(LoginUserContext)

  const cookie = getCookie('loginUser');
  const userInfo = cookie && JSON.parse(getCookie('loginUser'));
  setLoginUser(userInfo);
  
  
  const router = useRouter();;
  
  const handleLogout = () => {
    deleteCookie('loginUser');
    router.push('/');
  }
  const showAnnouce = () => {
    onOpen()
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link href="/">
              <Image w={180} src='/asset/logo_transparent.png' alt="" />
            </Link>
          </Box>
          <Box>
            {/*  */}
            {roomCtx !== undefined && roomCtx !== null ? `${roomCtx?.name}(${roomCtx.id})` : '参加を待っています'}
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              <Button onClick={showAnnouce}>{<FaRegBell />}</Button>
              {
                userInfo ? (
                  <Menu>
                    <MenuButton
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Avatar
                        as={'span'}
                        size={'sm'}
                        src={userInfo.image}
                      />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Center>
                        <Avatar
                          size={'2xl'}
                          src={userInfo.image}
                        />
                      </Center>
                      <br />
                      <Center>
                        <Text>{userInfo.name}</Text>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem><FiHome/><a>HOME</a></MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Button colorScheme="teal" variant="solid">
                    <FiHome/><Link href="/">Login</Link>
                  </Button>
                )
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}