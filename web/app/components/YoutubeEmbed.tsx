import { Box } from "@mui/material";
import React, { FC } from "react";

type Props = {
  embedId: string;
};

export const YoutubeEmbed: FC<Props> = ({ embedId }) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        paddingBottom: "56.25%",
        position: "relative",
        height: 0,
      }}
    >
      <Box
        sx={{
          left: 0,
          top: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        component="iframe"
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </Box>
  );
};
