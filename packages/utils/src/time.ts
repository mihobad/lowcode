// 使用：await sleep(1000)
export function sleep(duration: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}