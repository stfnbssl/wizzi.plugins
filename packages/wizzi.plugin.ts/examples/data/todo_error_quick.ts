if (accessToken) {
    ret['Authorization'] = 'token ' + accessToken as string;
    // ret['Beep'] = a(1,2,b(5,6,c()));
}

export function useEventListener<K extends keyof DocumentEventMap>(
	type: K,
	listener?: (this: Document, ev: DocumentEventMap[K]) => void,
): void {
}

export type { SplitPaneProps } from './lib/SplitPane'; // <--- error here : "export" instead of "export-type"

const clientSizes = new Map(
    childPanes.map(({ key, ref }): [string, number] => {
        const size = ref.current ? ref.current.getBoundingClientRect()[sizeAttr] : 0;
        return [key, size]; // <--- error here : "return [null]"
    }),
);



