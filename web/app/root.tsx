import { withEmotionCache } from "@emotion/react";
import {
  Box,
  Typography,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import { Layout } from "./components/Layout";
import { BallotProvider } from "./context/BallotContext";
import { EthereumProvider } from "./context/EthereumContext";
import { CustomError } from "./lib/error";
import ClientStyleContext from "./mui/ClientStyleContext";
import theme from "./mui/theme/theme";
import { LocalizationProvider } from "./mui/LocalizationProvider";
import { VoterProvider } from "./context/VoterContext";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    );
  }
);

export const meta: MetaFunction = () => {
  return { title: "Votify" };
};

export async function loader() {
  return {
    ENV: {
      BALLOT_CONTRACT_ADDRESS: process.env.BALLOT_CONTRACT_ADDRESS,
    },
  };
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  const data = useLoaderData();
  return (
    <Document>
      <LocalizationProvider>
        <EthereumProvider>
          <BallotProvider>
            <VoterProvider>
              <Layout>
                <Outlet />
              </Layout>
            </VoterProvider>
          </BallotProvider>
        </EthereumProvider>
      </LocalizationProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
        }}
      />
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  if (error instanceof CustomError) {
    return (
      <Document title="Error!">
        <Layout>
          <Box>
            <Typography variant="h1">{error.message}</Typography>
            {error.renderBody()}
            {error.renderActionButton()}
          </Box>
        </Layout>
      </Document>
    );
  } else {
    return (
      <Document title="Error!">
        <Layout>
          <Box>
            <Typography variant="h1">An error occurred</Typography>
            <Typography variant="body1">{error.message}</Typography>
          </Box>
        </Layout>
      </Document>
    );
  }
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}
