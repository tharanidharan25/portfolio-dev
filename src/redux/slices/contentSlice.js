import { createSlice } from "@reduxjs/toolkit";

class LinkedList {
    constructor() {
        this.head = null,
        this.tail = null,
        this.currentContent = null,
        this.size = 0
    }

    insertNode(node) {
        const curr = this.tail
        if (!curr) {
            this.head = node
            this.tail = node
        } else {
            node.prev = this.tail
            this.tail.next = node
            this.tail = node
        }
        this.currentContent = this.tail;
        this.size += 1;
    }

    deleteNode(node) {
        let curr = this.head
        while (curr !== node) {
            curr = curr.next
        }
        if (curr.prev) curr.prev.next = curr.next
        if (curr.next) curr.next.prev = curr.prev
        if (this.head === curr) this.head = curr.next
        if (this.tail === curr) this.tail = curr.prev
        if (this.currentContent === curr) {
            if (curr.prev) this.currentContent = curr.prev
            else this.currentContent = curr.next
        }
        curr.next = null;
        curr.prev = null;
        this.size -= 1;
    }

    setCurrentTab(node) {
        let curr = this.head;
        while (curr) {
            if (curr.data.id === node.data.id) {
                this.currentContent = curr;
                return true
            }
            curr = curr.next
        }
        return false
    }

    traverse() {
        const tabs = []
        let curr = this.head
        while (curr) {
            tabs.push(curr)
            curr = curr.next
        }
        return tabs
    }
}


const initialState = {
    openedTabs: new LinkedList(),
    openedTabsHash: {},
    tabs: [],
    currentContent: null,
    reachedTop: true,
    reachedEnd: false
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addOpenedTabs: (state, { payload }) => { // payload is a Node
            if (!state.openedTabs.setCurrentTab(payload)) {
                state.openedTabs.insertNode(payload);
            }
            if (!(Object.prototype.hasOwnProperty.call(state.openedTabsHash, payload.data.id))) {
                const newOpenedHashTabs = {
                    ...state.openedTabsHash,
                }
                newOpenedHashTabs[payload.data.id] = payload
                state.openedTabsHash = { ...newOpenedHashTabs }
            }
            state.tabs = state.openedTabs.traverse()
            state.currentContent = state.openedTabs.currentContent?.data?.id || null
            state.reachedTop = true
            state.reachedEnd = false
        },
        closeOpenedTab: (state, { payload }) => { // payload is a Node
            state.openedTabs.deleteNode(payload)
            state.tabs = state.openedTabs.traverse()
            state.currentContent = state.openedTabs.currentContent?.data?.id || null
            const newOpenedHashTabs = { ...state.openedTabsHash }
            delete newOpenedHashTabs[payload.data.id]
            state.openedTabsHash = { ...newOpenedHashTabs }
            state.reachedTop = true
            state.reachedEnd = false
        },
        setReachedTop: (state, { payload }) => {
            state.reachedTop = payload
        },
        setReachedEnd: (state, { payload }) => {
            state.reachedEnd = payload
        }
    }
})

export const {
    addOpenedTabs,
    closeOpenedTab,
    setReachedTop,
    setReachedEnd
} = contentSlice.actions;

export default contentSlice.reducer;