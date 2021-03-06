# ProgImg

React component to do **smooth image** loading. It can handle **lazy loading** too (IntersectionObserver) and **auto detect** the image size.   
*I'm currently just a student and I did this module to learn stuff, if you want a more professional module for lazy loading and progressive image loading you can check [React Lazy Load Image Component!](https://github.com/Aljullu/react-lazy-load-image-component/blob/master/README.md)*
### Features

* Progressive image loading using css effect
* Lazy loading using InterserctionObserver
* Image size auto detection before the image load
* Placeholder custom background 
* Customizable description with aria-* attribute
* Customizable css transition effect 
* Customizable image with jss or css class
* TypeScript declarations

# Installation

```

# YARN
$ yarn add react-prog-img

# NPM
$ npm i react-prog-img 

```

# Basic usage

```javascript
import React from 'react'
import ProgImg from 'react-prog-img'

const Basic = () => {
    return(
        <ProgImg src="big-img-file.jpg" conf={{isLazy: false}} />
    )
}
```

![demo-basic](./img_read_me/basic-demo.gif)  
***


```javascript
import React from 'react'
import ProgImg from 'react-prog-img'

const MediumLikeEffect = () => {
    return(
        <ProgImg src="big-img-file.jpg" smSrc="small-file-who-load-faster.jpg" effect="blur" conf={{isLazy: false}} />
    )
}
```

![demo-blur-effect](./img_read_me/blur-effect-demo.gif)  
***


```javascript
import React from 'react'
import ProgImg from 'react-prog-img'

const LazyLoad = () => {
    return(
        <>
            <div className="lot-of-margin-bottom">
            <ProgImg src="big-img-file.jpg" bg="#ceb4cb" conf={{isLazy: true, dimension: { width: 600, height: 300 }}} ariaDescribedBy={{component: 'h5', txt: 'caption'}} />
        </>
    )
}
```

![demo-lazy-loading](./img_read_me/lazy-load-demo.gif)  
***


# Props

Props | Types | Default | Description
----- | ----- | ------- | -----------
src* | string | | the image src
conf* | object | `{isLazy: false dimension: undefined}` | with this object you can set lazy loading on/off, you can also specify the dimension of the image(else it's auto detected)
smSrc | string | | the src of the same image as src, but in lower quality to make it load real quick
alt | string | | the alt of the image
ariaLabel | string | | aria-label for the image
ariaLabelledBy | object | `{component: 'p', txt: '', class: ''}` | aria-labelled-by (caption) for the image, you can chose the component, text and add a custom class 
ariaDescribedBy | object | `{component: 'p', txt: '', class: ''}` | aria-described-by for the image, you can chose the component, text and add a custom class 
bg | string | `'#eee'` | custom background placeholder (tips: dominant color of your image)
delay | number | `1` | the transition delay of the image(s)
trans | string | `'linear'` | the transition effect name, you can also put cubic bezier curve
cstClass | string | | a custom class for the placeholder
effect | string | `'blur'` | a css transition effect, you can put 'blur', 'black-n-white' or 'both, you can also create your own css/jss class  

> '*' means mandatory
