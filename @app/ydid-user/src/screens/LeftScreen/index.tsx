import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
// import DidManager from '@ydid/did';
import { CopyIcon } from '@chakra-ui/icons';
import { DidManager } from '@ydid/did/DidManager';
import { useState } from 'react';
import useSessionData from '../../data/useSessionData';
import DataSection from './DataSection';

export default function LeftScreen() {
  const { data } = useSessionData();
  return (
    <VStack gap="1rem">
      <div className="">Decentralized Web Node</div>
      {data.connected && <Divider />}
      <DWNSection />
    </VStack>
  );
}

const shortenDiD = (address: string | null): string => {
  if (!address) return '';

  const firstCharacters = address.slice(0, 8);
  const lastCharacters = address.slice(-8);

  return `${firstCharacters}...${lastCharacters}`;
};

export function DWNSection() {
  const { data, setData } = useSessionData();
  const buttonBgColor = useColorModeValue('#9d326c', 'teal.200');
  const buttonTextColor = useColorModeValue('white', 'gray.800');
  const bgColorHover = useColorModeValue('teal.600', 'teal.300');
  const bgColorActive = useColorModeValue('teal.700', 'teal.400');
  const [state, setState] = useState({
    btn: '' as string,
  });
  const [copySuccess, setCopySuccess] = useState(false);

  const containerBgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  const handleCopyToClipboard = (text?: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    }
  };

  const handleConnectWallet = async (label?: string) => {
    setState((prev) => ({ ...prev, btn: 'connecting' }));
    try {
      if (!label) {
        const { web5, did } = await DidManager.connectWithCustomOption();
        setData({
          ...data,
          web5,
          connected: true,
          did: did,
        });
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setState((prev) => ({ ...prev, btn: '' }));
    }
  };

  const onDisconnect = async (label?: string) => {
    setState((prev) => ({ ...prev, btn: 'disconnecting' }));
    try {
      if (!label) {
        setData({
          ...data,
          connected: false,
        });
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setState((prev) => ({ ...prev, btn: '' }));
    }
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
          isLoading={state.btn === 'connecting'}
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

  console.log({ data });
  return (
    <div>
      <Box
        bg={containerBgColor}
        p={4}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
          Connected to Wallet
        </Text>
        <Flex align="center" justify="center" mb={2}>
          <Text fontSize="sm" color="gray.500">
            {data.did ? shortenDiD(data.did) : 'Not connected'}
          </Text>
          {data.did && (
            <Tooltip label={copySuccess ? 'Copied!' : 'Copy to Clipboard'}>
              <Button
                size="sm"
                ml={2}
                onClick={() => handleCopyToClipboard(data.did!)}
                aria-label="Copy to Clipboard"
              >
                <CopyIcon />
              </Button>
            </Tooltip>
          )}
        </Flex>
        {data.did && data.connected && (
          <Button
            size="xs"
            colorScheme="teal"
            cursor={'pointer'}
            onClick={() => onDisconnect()}
            mt={2}
          >
            Disconnect
          </Button>
        )}
      </Box>

      <Divider w="100%" bg="#000" />
      <DataSection />
    </div>
  );
}
