import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Text,
  TextInput,
  Tooltip,
} from "@sanity/ui";
import {
  SlugInputProps,
  definePlugin,
  defineField,
  SanityDocument,
} from "sanity";
import slugify from "slugify";
import React from "react";
import styled from "styled-components";

// Add type declaration for slugify
declare module "slugify" {
  export default function slugify(
    string: string,
    options?: {
      replacement?: string;
      remove?: RegExp;
      lower?: boolean;
      strict?: boolean;
      locale?: string;
      trim?: boolean;
    },
  ): string;
}

const UrlPrefix = styled(Card)`
  flex: 0 1 min-content;

  pre {
    padding: 1em 0;
  }

  pre,
  code {
    overflow: hidden;
    white-space: nowrap;
    max-width: 30ch;
    text-overflow: ellipsis;
  }

  // When no generate button is available, make it bigger
  &[data-no-generate="true"] {
    pre,
    code {
      max-width: 35ch;
    }
  }
`;

// Extended interface for our needs
interface MySlugInputProps extends SlugInputProps {
  parent?: Record<string, any>;
}

// Extended SchemaOptions interface
interface CustomSchemaOptions {
  source?: string | (() => string);
  slugify?: (value: string, maxLength?: number) => string;
  maxLength?: number;
  urlPrefix?: string;
}

/**
 * Custom slug component for better UX & safer slugs:
 * - shows the final URL for the relative address (adds the BASE.PATH/ at the start)
 * - removes special characters and starting/trailing slashes
 */
const MyPrefixedSlug = (props: MySlugInputProps) => {
  const { value, schemaType, onChange } = props;
  const options = (schemaType.options as unknown as CustomSchemaOptions) || {};

  // Implement the missing generateSlug function
  const generateSlug = React.useCallback(() => {
    if (!options.source) return;

    const sourceValue =
      typeof options.source === "function"
        ? options.source()
        : props.parent?.[options.source as string];

    if (!sourceValue) return;

    const slugified = options.slugify
      ? options.slugify(sourceValue, options.maxLength)
      : slugify(sourceValue, { lower: true, strict: true });

    onChange({
      _type: "slug",
      current: slugified,
    } as any);
  }, [onChange, props.parent, options]);

  return (
    <Flex style={{ gap: "0.5em" }} align="center">
      {options.urlPrefix && (
        <Tooltip
          content={
            <Box padding={2}>
              <Text>{options.urlPrefix}</Text>
            </Box>
          }
        >
          <UrlPrefix data-no-generate={!options.source}>
            <Code size={1}>{options.urlPrefix}</Code>
          </UrlPrefix>
        </Tooltip>
      )}
      <Box flex={3}>
        <TextInput {...props.elementProps} />
      </Box>
      {options.source && (
        <Button
          mode="ghost"
          type="button"
          disabled={props.readOnly}
          onClick={generateSlug}
          text="Generate"
        />
      )}
    </Flex>
  );
};

export default MyPrefixedSlug;
