// This structure will:
// 1. Create a single item for "About Page"
// 2. List out all other document types (like "Project") automatically

export const myStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Our singleton "About Page"
      S.listItem().title('About Page').child(
        S.document().schemaType('about').documentId('about'), // The ID is fixed to 'about'
      ),
      S.divider(),
      // The rest of our document types
      ...S.documentTypeListItems().filter((listItem: any) => !['about'].includes(listItem.getId())),
    ])
