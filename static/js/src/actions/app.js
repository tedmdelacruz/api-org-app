export const SELECT_TAB = 'SELECT_TAB'
export function selectTab(tab) {
    return {
        type: SELECT_TAB,
        tab
    }
}