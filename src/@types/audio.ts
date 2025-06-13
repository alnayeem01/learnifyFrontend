import { categoriesTypes } from "../utils/Categories";

// export interface AudioData {
//     id: string,
//     title: string;
//     about: string;
//     category: categoriesTypes;
//     poster?: {
//         url: string;
//         publicId: string;
//     } | undefined;
//     owner: {
//         name: string;
//         id: string;
//     }
// };
export interface AudioData {
    id: string,
    title: string;
    about: string;
    category: categoriesTypes;
    file: string;
    poster?: {
        url : string,
        id: string
    },
    owner: {
        name: string;
        id: string;
    }
};

export interface PlayList {
    id: string;
    title: string;
    itemsCount: number;
    visibility: "public" | "private";
}
