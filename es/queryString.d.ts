export declare const queryString: {
    parse: (str: string) => {
        [key: string]: string;
    };
    stringify: (obj: {
        [key: string]: any;
    }) => string;
};
