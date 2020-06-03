import * as React from 'react'

export interface ProgImgProps {
    src: string;
    smSrc?: string;
    alt?: string;
    ariaLabel?: string;
    ariaLabelledBy?: Label;
    ariaDescribedBy?: Label;
    bg?: string;
    delay?: number;
    trans?: string;
    cstClass?: string;
    effect?: string;
    conf: conf;
}

export interface returnHook {
    state: state;
    dispatch: React.Dispatch<stateAction>;
    imgRef: React.MutableRefObject<HTMLImageElement | null>;
    imgSmRef: React.MutableRefObject<HTMLImageElement | null>;
}

export interface stateAction {
    type: string;
    data: null | Dimension;
}

export interface state {
    isLoaded: isLoaded;
    dimension: null | Dimension;
}

interface isLoaded {
    xl: string | undefined;
    sm: string |undefined
}

export interface Dimension {
    width: number;
    height: number;
}

interface Label {
    component: string;
    txt: string;
    class?: string 
}

export interface conf {
    isLazy: boolean;
    dimension?: Dimension
}
