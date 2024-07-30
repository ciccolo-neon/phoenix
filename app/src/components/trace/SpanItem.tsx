import React from "react";
import { css } from "@emotion/react";

import { Flex, Text, View } from "@arizeai/components";

import { TokenCount } from "@phoenix/components/trace/TokenCount";
import { SpanStatusCode } from "@phoenix/pages/project/__generated__/SpansTable_spans.graphql";

import { LatencyText } from "./LatencyText";
import { SpanKindLabel } from "./SpanKindLabel";
import { SpanStatusCodeIcon } from "./SpanStatusCodeIcon";

interface SpanItemProps {
  name: string;
  spanKind: string;
  latencyMs: number | null;
  statusCode: SpanStatusCode;
  tokenCountTotal?: number | null;
  tokenCountPrompt?: number | null;
  tokenCountCompletion?: number | null;
}
export function SpanItem(props: SpanItemProps) {
  const {
    name,
    latencyMs,
    spanKind,
    statusCode,
    tokenCountTotal,
    tokenCountPrompt,
    tokenCountCompletion,
  } = props;
  return (
    <View height="size-500" width="100%">
      <Flex
        direction="row"
        gap="size-150"
        width="100%"
        height="100%"
        alignItems="center"
      >
        <SpanKindLabel spanKind={spanKind} />
        <View flex="1 1 auto">
          <div
            css={css`
              float: left;
            `}
          >
            <Text>{name}</Text>
          </div>
        </View>
        {typeof tokenCountTotal === "number" ? (
          <TokenCount
            tokenCountTotal={tokenCountTotal}
            tokenCountPrompt={tokenCountPrompt ?? 0}
            tokenCountCompletion={tokenCountCompletion ?? 0}
          />
        ) : null}
        {latencyMs === null ? null : <LatencyText latencyMs={latencyMs} />}
        {statusCode === "ERROR" ? (
          <SpanStatusCodeIcon statusCode="ERROR" />
        ) : null}
      </Flex>
    </View>
  );
}
