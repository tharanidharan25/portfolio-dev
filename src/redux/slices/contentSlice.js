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
            this.tail.next = node
            this.tail = this.tail.next
        }
        this.currentContent = this.tail;
        this.size += 1;
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
            tabs.push(curr.data)
            curr = curr.next
        }
        return tabs
    }
}

const initialState = {
    openedTabs: new LinkedList(),
    tabs: [],
    currentContent: null
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addOpenedTabs: (state, { payload }) => { // payload is a Node
            if (!state.openedTabs.setCurrentTab(payload)) {
                state.openedTabs.insertNode(payload);
            }
            state.tabs = state.openedTabs.traverse();
            state.currentContent = state.openedTabs.currentContent?.data?.id || null;
        }
    }
})

export const {
    addOpenedTabs
} = contentSlice.actions;

export default contentSlice.reducer;