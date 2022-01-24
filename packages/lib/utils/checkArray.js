export const checkArray = async (value) => {
    if (typeof value === 'object'
        && value
        && Array.isArray(value)
        && value.length
    ) {
        return true;
    }
    return false;
}
