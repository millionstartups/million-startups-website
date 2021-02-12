import S from "@sanity/desk-tool/structure-builder";
import { MdWeb, MdSettings, MdWebAsset, MdContactMail } from "react-icons/md";
import {BiWorld} from 'react-icons/bi'
import { ImHeadphones } from "react-icons/im";
import {FaCookieBite} from 'react-icons/fa'
// Hide document types that we already have a structure definition for
const hiddenDocTypes = (listItem) =>
  ![
    "siteConfig",
    "frontpage",
    "contact",
    "cookies",
    "author",
    "post",
    "comment",
    "category", 
    "episode"
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
                S.listItem()
                .title("Cookie Policy")
                .icon(FaCookieBite)
                .child(
                  S.document()
                    .title("Cookie Policy")
                    .schemaType("cookies")
                    .documentId("cookies")
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
        S.listItem()
        .title('Episodes')
        .icon(ImHeadphones)
        .child(
          S.documentTypeList('episode'),
          S.documentTypeListItem('episode')
        ),  
    ]);
