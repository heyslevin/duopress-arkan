import { useState, useEffect } from "react";
import { useClient, useFormValue } from "sanity";
import _ from "lodash";
import { formatString } from "@/sanity/lib/helpers";

const ASYNC_PAGE_SECTION_QUERY = `
    *[_id == $id] {
      pageBuilder[] {
      ...,
        _key,
        heading,
        title,
        "type": _type,
        "sectionId": sectionId,
      }
    }[0].pageBuilder
`;

const AsyncSelect = (props) => {
  const [listItems, setListItems] = useState([]);
  const { schemaType, renderDefault, path, onChange, value } = props;
  const { options } = schemaType;
  const internalLink = useFormValue([...path.slice(0, -1), "page"]);

  const studioClient = useClient({ apiVersion: "2024-08-01" });

  function formatSections(sections) {
    console.log({ formatting: sections });
    const formattedSections = sections
      .map((section) => {
        if (!section.sectionId) {
          return null;
        } else {
          return {
            title: `${_.startCase(section.type)} · ${formatString(section.sectionId)}`,
            value: section.sectionId,
          };
        }
      })
      .filter(Boolean); // Remove null/undefined values

    return [
      { title: "---Select a page block---", value: "initial" },
      ...formattedSections,
    ];
  }

  useEffect(() => {
    const getSections = async () => {
      try {
        const data = await studioClient.fetch(ASYNC_PAGE_SECTION_QUERY, {
          id: internalLink._ref ? internalLink._ref : "",
        });
        const formatted = formatSections(data || []);
        console.log({ formattedData: formatted });
        setListItems(formatted);

        // Set initial value if not present
        // if (!value && formatted.length > 0) {
        //   console.log({goingIntoOnChange: formatted[0].value})
        //   onChange(formatted[0].value)
        // }
      } catch (error) {
        console.error("Error fetching sections:", error);
        setListItems([
          { title: "---Select a page block---", value: "initial" },
        ]);
      }
    };

    getSections();
  }, [internalLink, studioClient, onChange, value]);

  return renderDefault({
    ...props,
    schemaType: {
      ...schemaType,
      options: { ...options, list: listItems },
    },
  });
};

export default AsyncSelect;
