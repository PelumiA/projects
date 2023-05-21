import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractRead, useMetadata } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Box, Container, Flex, Heading, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react"; 
//import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const contractAddress = "0x80769Bc4206223EE1D3DD97355d11BC7a0E1394A"; // Goerli 
  const address = useAddress();
  const {contract} = useContract(contractAddress)
  const { data: metadata, isLoading: isLoadingMetadata } = useMetadata(contract)
  const { data: totalSupply, isLoading: isLoadingTotalSupply } = useContractRead(contract, "totalSupply");



  return (
          <Container>
            <Flex p ={"20px"} justifyContent={"space-between"}>
              <Box> </Box>
            <ConnectWallet />
            </Flex>
          <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Skeleton isLoaded={!isLoadingMetadata} >
                  <MediaRenderer 
                  src={(metadata as {image?: string})?.image}
                  />
              </Skeleton>
              
              </Box>
              <Flex direction={"column"} justifyContent={"center"}>
                <Stack direction={"column"} spacing={4}>
                <Skeleton isLoaded={!isLoadingMetadata}>
                  <Heading> {(metadata as {name?: string})?.name}</Heading>
                  <Text> {(metadata as {description?: string})?.description}</Text>
                  </Skeleton>
                  <Skeleton isLoaded={!isLoadingTotalSupply}>
                  <p> Total Minted: {totalSupply?.toNumber()}/5</p>
               
                  </Skeleton>   
                  {address ? (
                           <Web3Button
                            contractAddress = {contractAddress}
                            action={(contract) => contract.erc721.claim(1)}
                           >Claim</Web3Button>
                  ) : (
                    <Text> Please connectt your wallet</Text>
                  )}               
                  </Stack>
              </Flex>

              </SimpleGrid>
          </Flex>
          </Container>
  );
};

export default Home;
