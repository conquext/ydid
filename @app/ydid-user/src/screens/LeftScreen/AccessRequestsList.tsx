import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

interface AccessRequest {
  id: number;
  appName: string;
  dataRequested: string;
}

interface AccessRequestsListProps {
  accessRequests: AccessRequest[];
  onAccept: (requestId: number) => void;
  onDismiss: (requestId: number) => void;
}

const AccessRequestsList: React.FC<AccessRequestsListProps> = ({
  accessRequests,
  onAccept,
  onDismiss,
}) => {
  const containerBgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box
      bg={containerBgColor}
      p={4}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
        Access Requests
      </Text>
      {accessRequests.map((request) => (
        <Flex key={request.id} align="center" mb={2}>
          <Box flex="1">
            <Text fontSize="md">{`${request.appName} is requesting access to ${request.dataRequested}`}</Text>
          </Box>
          <Spacer />
          <Button
            size="sm"
            colorScheme="green"
            onClick={() => onAccept(request.id)}
            mr={2}
          >
            Accept
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => onDismiss(request.id)}
          >
            Dismiss
          </Button>
        </Flex>
      ))}
    </Box>
  );
};

export default AccessRequestsList;
