export interface TreeNode {
        id: number;
        name: string;
        type: string;
        img?: string;
        warning?: boolean;
        childs?: TreeNode[];      
}
