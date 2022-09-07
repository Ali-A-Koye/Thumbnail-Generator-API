
export const schemaLoader = async () => {
    return {
        thumbnail: (await import ("../schema/thumbnail.schema")).default
    }
}
