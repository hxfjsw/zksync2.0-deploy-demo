import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import getWallet from "../utils/getWallet";
import verify from "../utils/verify";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Greeter contract`);

  const wallet = await getWallet(hre);

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("NftExchange");


  const beneficiary = "0x1E132Bc414DE666166Db5d79CD8EF520c1354BD9";
  const buyerFeeSigner = "0x1E132Bc414DE666166Db5d79CD8EF520c1354BD9";

  const tranferProxy_address = '0x2f6570D49e4643D2F86B333be151B030e64E8D0C';
  const transferProxyForDeprecated_address ='0x408c42a728514735E107e428c69a1422fc44EE83';
  const erc20TransferProxy_address = '0xDa68a7C9fEEe5f4d1E633b9c2100fE81c629a3c7';
  const exchangeState_address ='0xd332c5e4A680fDE6b4Ce84983ab1eDf66Cfee9DD';
  const exchangeOrderHolder_address= '0xD778d9d73701a6065d4bcf67781a86f8BC243bF9';


  const contractConstructorArguments = [
    tranferProxy_address,
    transferProxyForDeprecated_address,
    erc20TransferProxy_address,
    exchangeState_address,
    exchangeOrderHolder_address,
    beneficiary,
    buyerFeeSigner
  ];
  console.log(`Arguments for the contract constructor: ${JSON.stringify(contractConstructorArguments)}`);
  const deployedContract = await deployer.deploy(artifact, contractConstructorArguments);
  
  // Show th
  await verify({hre, contract: deployedContract, contractConstructorArguments, artifact});
}