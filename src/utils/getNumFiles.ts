import path from 'path';
import fs from 'fs';

const projectRoot = process.cwd();
export async function countFiles(directory: string) {
    try {
        directory = path.join(projectRoot, directory);
        const files = await fs.promises.readdir(directory);
        const fileCount = (
            await Promise.all(
                files.map(async (file) => {
                    const filePath = path.join(directory, file);
                    const stat = await fs.promises.stat(filePath);
                    return stat.isFile();
                })
            )
        ).filter((isFile) => isFile).length;

        return fileCount;
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}
