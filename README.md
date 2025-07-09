## What's this?

Finished Duopress, a page builder created by [Manuel Llaguno](https://www.manuel.work) using Next.js + Sanity

## Who is this for?

For businesses that want to launch a website.

## When was this started?

This is version 5, starting on June 06, 2025.

## Who is making this?

I'm a designer that codes.

## What technologies are used?

I'm using:

- React
- Next.js
- Sanity
- Tailwind

# Setup

NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET=""
SANITY_API_READ_TOKEN=""
SANITY_STUDIO_PREVIEW_URL=""

# Building a block (You can prompt cursor with this)

## Overview

Create a basic block component for a Sanity.io and Next.js page builder. The block should have minimal styling and basic content fields, following a simple, consistent pattern.

## Technical Requirements

### 1. Sanity Schema (blockType.tsx)

Create a minimal schema with these basic fields:

```typescript
export default {
  name: "blockName",
  title: "Block Name",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "string",
    },
    // Optional: Add one additional field if needed
    // Example for metrics:
    // {
    //   name: 'metrics',
    //   title: 'Metrics',
    //   type: 'array',
    //   of: [{ type: 'metric' }]
    // }
  ],
};
```

### 2. GROQ Query

Basic query structure:

```typescript
export const blockQuery = `
  _type == "blockName" => {
    heading,
    caption,
    text,
    // Include additional field if present
  }
`;
```

### 3. React Component (Block.tsx)

Create a minimal component:

```typescript
import { BlockContainer } from '@/components/BlockContainer'
import { BlockProps } from '@/types'

export default function Block({ data }: BlockProps) {
  if (!data) return null

  return (
    <BlockContainer>
      <div>
        {data.heading && <h2>{data.heading}</h2>}
        {data.caption && <p>{data.caption}</p>}
        {data.text && <p>{data.text}</p>}
        {/* Render additional field if present */}
      </div>
    </BlockContainer>
  )
}
```

### 4. Integration Steps

1. Add the block to Sanity configuration:

   - Add to SCHEMA_ARRAY_OF_BLOCKS in page.ts
   - Register in schemaTypes/index.ts
   - Add to BlockRenderer.tsx

2. Generate TypeScript types:
   ```bash
   npm run typegen
   ```

## Component Features

- Basic content rendering
- Simple error handling (null check)
- Uses shared BlockContainer component

## TypeScript Types

```typescript
interface BlockData {
  heading?: string;
  caption?: string;
  text?: string;
  // Add type for additional field if present
}

interface BlockProps {
  data: BlockData;
}
```

## Best Practices

1. Schema Design:

   - Keep fields simple and clear
   - Use meaningful names
   - Add basic validation if needed

2. Component Implementation:
   - Use BlockContainer for consistent spacing
   - Keep styling minimal
   - Handle null/undefined data
   - Use semantic HTML elements

## Notes

- No custom styling needed
- No responsiveness required
- No complex layouts
- No additional dependencies
- Follow existing project patterns
