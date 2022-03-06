import { Box, Typography } from "@mui/material";
import { YoutubeEmbed } from "~/components/YoutubeEmbed";
import { GenericPageLayout } from "~/components/GenericPageLayout";

function NoEthereumProvider() {
  return (
    <GenericPageLayout>
      <Typography variant="pageTitle">
        MetaMask "Nonce too high" error
      </Typography>
      <Box>
        <Typography variant="body1">Hello developer! 🙋‍♂️</Typography>
        <Typography variant="body1">
          You've just encountered a frequent problem that occurs when you
          restart your local Hardhat blockchain.
        </Typography>
        <Typography variant="body1">
          To fix this problem, simply click on the MetaMask extension, and for
          each account, do the following:
        </Typography>
        <ol>
          <li>Click "Settings"</li>
          <li>Click "Advanced"</li>
          <li>Click "Reset Account"</li>
        </ol>
      </Box>
      <YoutubeEmbed embedId="Y6ExSniRloA" />
    </GenericPageLayout>
  );
}

export default NoEthereumProvider;
