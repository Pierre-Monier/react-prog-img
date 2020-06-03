import * as React from 'react';
import { useEffect, useRef, useReducer } from 'react'
import { ProgImgProps, returnHook, Dimension, stateAction, state, conf } from '../types/declaration'
import { getIntersectionObserver } from '../utils/intersection-obeserver'
import '../style/ProgImg.css'

const initialState: state = { isLoaded: {xl: '', sm: ''}, dimension: null }

function reducer(state: state, action: stateAction) {
    switch (action.type) {
        case 'ADDISLOADED':
            // the big img is loaded
            return { isLoaded: {xl: 'loaded', sm: state.isLoaded.sm}, dimension: state.dimension }
        case 'ADDISSMLOADED':
            // the small img is loaded
            return { isLoaded: {xl: state.isLoaded.xl, sm: 'loaded'}, dimension: state.dimension }
        case 'ADDDIMENSION':
            // auto detected dimension is loaded
            return { isLoaded: state.isLoaded, dimension: action.data }  
        default:
            throw new Error();           
    }
}

const useHook = (conf: conf): returnHook => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const imgSmRef = useRef<HTMLImageElement | null>(null)
    useEffect(() => {
        if(conf.isLazy){
            if (getIntersectionObserver()) {
                const lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if(entry.isIntersecting){
                            // img is in the viewport
                            let img = entry.target as HTMLImageElement
                            img.src = img.dataset.src as string;
                            if(!conf.dimension){
                                // auto detect image dimension on conf, it's ugly
                                const _getSize = () => {
                                    if(img.naturalWidth > 0){
                                        dispatch({ type: "ADDDIMENSION", data: {width: img.naturalWidth, height: img.naturalHeight}})
                                        clearInterval(interval)
                                    }
                                }
                                const interval = setInterval(_getSize, 100)
                                if(state.dimension){
                                    clearInterval(interval)
                                }
                            }
                            observer.unobserve(entry.target)
                        }
                    });
                });  
                // put all the ref in a tab and observe them 
                const imgTab = []
                if(imgRef.current !== null){
                    imgTab.push(imgRef.current)
                }
                if(imgSmRef.current !== null){
                    imgTab.push(imgSmRef.current)
                }
                if(imgTab[0] !== null){
                    imgTab.forEach(el => {
                        lazyBackgroundObserver.observe(el as Element)
                    })
                }
            }
        }else{
            if(imgRef.current && !conf.dimension){
                // auto detect dimension if their is no dimension given and if it's not confed
                const _getSize = () => {
                    if(imgRef.current && imgRef.current.naturalWidth > 0){
                        dispatch({ type: "ADDDIMENSION", data: {width: imgRef.current.naturalWidth, height: imgRef.current.naturalHeight}})
                        clearInterval(interval)
                    }
                }
                const interval = setInterval(_getSize, 100)
                if(state.dimension){
                    clearInterval(interval)
                } 
            }                                           
        }
    }, [conf.isLazy, conf.dimension, state.dimension]);
    return {state, dispatch, imgRef, imgSmRef}

}

const ProgImg: React.FC<ProgImgProps> = ({src, smSrc, alt, ariaLabel, ariaLabelledBy, ariaDescribedBy, bg, delay, trans, cstClass, effect, conf}) => {
    
    const data = useHook(conf)
    // for the child div of placeholder div, need it to display image
    const getRatio = (dimension: Dimension | null): number | void => {
        if(dimension){
            return (dimension.height/dimension.width)*100
        }      
    }
    const transStyle = {transition: `opacity ${delay}s ${trans}`}
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
        <figure 
            role="img" 
            aria-label={ariaLabel}  
            aria-labelledby={ariaLabelledBy?.txt ? 'label' : ''} 
            aria-describedby={ariaDescribedBy?.txt ? 'description' : ''} 
            className="figure"
        >
            <div 
                className={`${cstClass} placeholder`} 
                id="test"
                style={{width: conf?.dimension ? `${conf.dimension.width}px` : data.state.dimension ? `${data.state.dimension.width}px` : '100%', backgroundColor: bg}}
            >
                { smSrc ? 
                            <img 
                            data-src={conf.isLazy ? smSrc : null} 
                            src={!conf.isLazy ? smSrc : ''} alt={alt} className={`${data.state.isLoaded.sm} sm ${effect}`} 
                            onLoad={() => data.dispatch({type: 'ADDISSMLOADED', data: null})} 
                            ref={data.imgSmRef}
                            style={transStyle}
                            />
                : null }
                <div 
                    style={{paddingBottom: `${getRatio(conf?.dimension ? conf.dimension : data.state.dimension)}%`}}
                />
                <img 
                    data-src={conf.isLazy ? src : null} 
                    src={!conf.isLazy ? src : ''} 
                    alt={alt} 
                    className={data.state.isLoaded.xl}  
                    onLoad={() => data.dispatch({type: 'ADDISLOADED', data: null})} 
                    ref={data.imgRef} 
                    style={transStyle}
                /> 
            </div>
            { ((data.state.dimension || conf.dimension) && ariaLabelledBy?.txt) || ((data.state.dimension || conf.dimension) && ariaDescribedBy?.txt) ?
                <figcaption>
                    { 
                        ariaLabelledBy?.txt ?
                        React.createElement(ariaLabelledBy.component, { className: ariaLabelledBy.class, id: 'label' }, ariaLabelledBy.txt)
                        : null
                    }
                    {
                        ariaDescribedBy?.txt ?
                        React.createElement(ariaDescribedBy.component, { className: ariaDescribedBy.class, id: 'description' }, ariaDescribedBy.txt)
                        :null
                    }
                </figcaption>
            : null }
        </figure>
    )
}
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
const defaultProps: ProgImgProps = {
    src: '',
    smSrc: '',
    alt: '',
    ariaLabel: '',
    ariaLabelledBy: {
        component: 'p',
        txt: '',
        class: ''
    },
    ariaDescribedBy: {
        component: 'p',
        txt: '',
        class: ''
    },
    bg: '#eee',
    delay: 1,
    trans: 'linear',
    cstClass: '',
    effect: 'blur',
    conf: {
        isLazy: false
    } 
}
ProgImg.defaultProps = defaultProps 
export default ProgImg;