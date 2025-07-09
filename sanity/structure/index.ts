// ./deskStructure.js
import { CogIcon } from "@sanity/icons";
import { Palette, PanelTop, Target } from "lucide-react";
import { StructureBuilder } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
//Helper function to create Singletons
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string,
) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(
      S.document()
        .title(title || typeName)
        .schemaType(typeName)
        .documentId(typeName),
    );

//Desk Structure Settings
export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        (listItem: any) =>
          ![
            "person",
            "settings",
            "style",
            "header",
            "assist.instruction.context",
            "media.tag",
            "post",
            "products",
          ].includes(listItem.getId()),
      ),
      // Optional configuration
      orderableDocumentListDeskItem({
        type: "products",
        title: "Productos",
        icon: Target,
        menuItems: [], // allow an array of `S.menuItem()` to be injected to orderable document list menu
        // pass from the structure callback params above
        S,
        context,
      }),
      S.divider(),
      singletonListItem(S, "header", "Navigation Menus").icon(PanelTop),
      singletonListItem(S, "settings", "Site Settings").icon(CogIcon),
    ]);
