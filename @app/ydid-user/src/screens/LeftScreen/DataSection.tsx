// App.tsx
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import AccessRequestsList from './AccessRequestsList';

interface AccessRequest {
  id: number;
  appName: string;
  dataRequested: string;
}

const DataSection: React.FC = () => {
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([
    { id: 1, appName: 'App 1', dataRequested: 'Email' },
    { id: 2, appName: 'App 2', dataRequested: 'Profile' },
    // Add more requests as needed
  ]);

  const handleAccept = (requestId: number) => {
    // Simulate accepting the access request
    setAccessRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
    console.log(`Accepted request with ID ${requestId}`);
  };

  const handleDismiss = (requestId: number) => {
    // Simulate dismissing the access request
    setAccessRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
    console.log(`Dismissed request with ID ${requestId}`);
  };

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Web5 Access Control</h1>

        <Accordion allowMultiple>
          {/* Access Requests Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Access Requests
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <AccessRequestsList
                accessRequests={accessRequests}
                onAccept={handleAccept}
                onDismiss={handleDismiss}
              />
            </AccordionPanel>
          </AccordionItem>

          {/* Data Store Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Data Store
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {/* Content for Data Store section */}
              <p>Data Store content goes here.</p>
            </AccordionPanel>
          </AccordionItem>

          {/* Authorized Applications Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Authorized Applications
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {/* Content for Authorized Applications section */}
              <p>Authorized Applications content goes here.</p>
            </AccordionPanel>
          </AccordionItem>

          {/* Audit Log Section */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Audit Log
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {/* Content for Audit Log section */}
              <p>Audit Log content goes here.</p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default DataSection;
