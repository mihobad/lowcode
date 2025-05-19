interface Item {
    name: string;
    defaultValue?: any; // 若 defaultValue 有明确类型可替换为具体类型
    [key: string]: any;
}

interface UIConfigItem {
    items: Item[];
    [key: string]: any;
}

export const mapProps = (uiConfig: UIConfigItem[]) => {
    return uiConfig
        .map((it: UIConfigItem) => it.items)
        .flat()
        .reduce((prev: Record<string, any>, current: Item) => {
            prev[current.name] = current.defaultValue ?? null;
            return prev;
        }, {} as Record<string, any>);
};
