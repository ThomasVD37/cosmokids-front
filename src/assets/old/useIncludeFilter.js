export const useIncludeFilter = (array, string) => {
    const searchKeys = ["title"];
    return array.filter((object) =>
        searchKeys.some((key) => {
            const value = object[key];
            return (
                typeof value === "string" &&
                value.toLowerCase().includes(string.toLowerCase())
            );
        })
    );
};
