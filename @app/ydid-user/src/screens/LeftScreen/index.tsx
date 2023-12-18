import {
  Button,
  Divider,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import useSessionData from '../../data/useSessionData';

export default function LeftScreen() {
  return (
    <VStack gap="1rem">
      <div className="">Decentralized Web Node</div>
      <DWNSection />
    </VStack>
  );
}

export function DWNSection() {
  const { data } = useSessionData();
  const buttonBgColor = useColorModeValue('#9d326c', 'teal.200');
  const buttonTextColor = useColorModeValue('white', 'gray.800');
  const bgColorHover = useColorModeValue('teal.600', 'teal.300');
  const bgColorActive = useColorModeValue('teal.700', 'teal.400');

  const handleConnectWallet = (label?: string) => {
    // do something
  };

  if (!data.connected) {
    return (
      <VStack align={'center'} py="6rem" mb="2rem" w="100%">
        <Button
          size="lg"
          px="16px"
          py="12px"
          colorScheme="teal"
          outline={'unset'}
          cursor="pointer"
          bgColor={buttonBgColor}
          color={buttonTextColor}
          _hover={{
            bgColor: bgColorHover,
          }}
          _active={{
            bgColor: bgColorActive,
          }}
          onClick={() => handleConnectWallet()}
        >
          Connect DWN
        </Button>
        <Divider h={'1px'} bg={'#000'} />
        <HStack align={'center'} justifyContent={'space-between'}>
          <Button
            size="sm"
            px="6px"
            py="4px"
            fontSize={'0.85rem'}
            outline={'unset'}
            cursor="pointer"
            onClick={() => handleConnectWallet()}
          >
            Generate DiD
          </Button>
          <Button
            size="sm"
            px="6px"
            py="4px"
            outline={'unset'}
            fontSize={'0.85rem'}
            cursor="pointer"
            onClick={() => handleConnectWallet()}
          >
            Create New DWN
          </Button>
        </HStack>
      </VStack>
    );
  }

  return (
    <div>
      <div className="">Decentralized Web Node</div>
    </div>
  );
}
