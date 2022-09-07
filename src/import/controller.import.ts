
export const controllerLoader = async () => {
    return {
        thumbnail: (await import ("../controller/thumbnail.controller")).default
    }
}
