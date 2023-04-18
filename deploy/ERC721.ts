import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import getWallet from "../utils/getWallet";
import verify from "../utils/verify";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Greeter contract`);

  const wallet = await getWallet(hre);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("NFT721");

  const admin = "0xe3B46e5Ca4E47B90fb8cCc5Cb0219993728C0048";

  const contractConstructorArguments = [
    "TestNFT", "TestNFT", admin, "https://eplktocelqm419.github.io/JackHorse/json/", "https://eplktocelqm419.github.io/JackHorse/json/"
  ];
  console.log(`Arguments for the contract constructor: ${JSON.stringify(contractConstructorArguments)}`);
  const deployedContract = await deployer.deploy(artifact, contractConstructorArguments);
  
  // Show th
  await verify({hre, contract: deployedContract, contractConstructorArguments, artifact});
}