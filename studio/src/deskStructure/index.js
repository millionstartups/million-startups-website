import S from "@sanity/desk-tool/structure-builder";
import { MdWeb, MdSettings, MdWebAsset, MdContactMail } from "react-icons/md";
import {BiWorld} from 'react-icons/bi'
import { BsFillPersonLinesFill } from "react-icons/bs";
// Hide document types that we already have a structure definition for
const hiddenDocTypes = (listItem) =>
  ![
    "siteConfig",
    "frontpage",
    "contact",
    "author",
    "post",
    "comment",
    "category"
  ].includes(listItem.getId());

export default () =>
  S.list()
    .title("The Million Startups")
    .items([
      S.listItem()
        .title("Web Content")
        .icon(BiWorld)
        .child(
          S.list()
            .title("Web Content")
            .items([
              S.listItem()
                .title("Site configuration")
                .icon(MdSettings)
                .child(
                  S.document()
                    .title("Site configuration")
                    .schemaType("siteConfig")
                    .documentId("siteConfig")
                ),
                S.listItem()
                .title("Frontpage")
                .icon(MdWebAsset)
                .child(
                  S.document()
                    .title("Frontpage")
                    .schemaType("frontpage")
                    .documentId("frontpage")
                ),
                S.listItem()
                .title("Contact")
                .icon(MdContactMail)
                .child(
                  S.document()
                    .title("Contact")
                    .schemaType("contact")
                    .documentId("contact")
                ),
            ]),
        ),
        S.listItem()
        .title("Blog")
        .icon(MdWeb)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("comment").title("Comments"),

              S.documentTypeListItem("author").title("Author"),
            ]),
        ),
    ]);
