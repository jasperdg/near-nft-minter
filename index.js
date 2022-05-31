
(async ()=>{
    const MAX_GAS = "300000000000000";
    require("dotenv").config();
    const { keyStores, connect, Contract } = require("near-api-js");
    
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(process.env.KEYSTORE_PATH);
        
    const config = {
      networkId: "mainnet",
      keyStore, 
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.near.org",
      explorerUrl: "https://explorer.near.org",
    };

    const near = await connect(config);
    const account = await near.account(process.env.MY_ACCOUNT);
    const nftContract = new Contract(
        account,
        process.env.MINT_CONTRACT,
        {
            changeMethods: ["nft_mint"],
            sender: account
        }
    );

    for (let i = 0; i < process.env.MINT_AMOUNT; i++) {
        await nftContract.nft_mint(
            {
                args: {
                    type: "ps",
                    receiver_id: account.accountId
                },
                gas: MAX_GAS,
                amount: process.env.MINT_PRICE
            }
        )
    }
})();    
