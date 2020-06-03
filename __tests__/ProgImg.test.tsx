import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ProgImg from '../src/component/ProgImg';
let container: HTMLDivElement | null

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
  container = null;
});
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
it('render the component', () => {
  // Teste le premier affichage et l'appel à componentDidMount
  act(() => {
    ReactDOM.render(<ProgImg src="/test.jpg" conf={{isLazy: false}} />, container);
  });
  const component = container?.querySelector('figure');
  expect(component).toBeDefined();
});
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
it('give the dimension to the placeholder div, the ration to the first child div of placeholder div, 100% when nothing', () => {
    // Teste le premier affichage et l'appel à componentDidMount
    act(() => {
      ReactDOM.render(<ProgImg src="/test.jpg" conf={{isLazy: false, dimension: {width: 1980, height: 1080}}} />, container);
    });

    const placeholder: HTMLElement = container?.querySelector('figure')?.firstChild as HTMLElement;
    expect(placeholder.style.width).toBe('1980px');

    const ratioDiv: HTMLElement = placeholder.firstChild as HTMLElement
    expect(ratioDiv.style.paddingBottom).toBe(`${(1080/1980)*100}%`)

    act(() => {
      ReactDOM.render(<ProgImg src="/test.jpg" conf={{isLazy: false}} />, container);
    });
    expect(placeholder.style.width).toBe('100%');
});
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
it('render the caption with aria attribute', () => {
    const txtDescri = 'testing aria-describedby'
    const txtLabel = 'testing aria-labelledby'
    act(() => {
        ReactDOM.render(<ProgImg src="/test.jpg" conf={{isLazy: false, dimension: {width: 1980, height: 1080}}} ariaDescribedBy={{ component: 'h5', txt: txtDescri }}/>, container);
    });
    const caption = container?.querySelector('h5')
    expect(caption?.textContent).toBe(txtDescri)
    expect(caption?.getAttribute('id')).toBe('description')
    act(() => {
        ReactDOM.render(<ProgImg src="/test.jpg" conf={{isLazy: false, dimension: {width: 1980, height: 1080}}} ariaLabelledBy={{ component: 'p', txt: txtLabel }}/>, container);
    });
    const label = container?.querySelector('p')
    expect(label?.textContent).toBe(txtLabel)
    expect(label?.getAttribute('id')).toBe('label')
})
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
it('empty the src attribute in lazy mode, because it give the src attribute and load the img only when the component is in the viewport', () => {
    const src = "/test.jpg"
    act(() => {
        ReactDOM.render(<ProgImg src={src} conf={{isLazy: true, dimension: {width: 1980, height: 1080}}}/>, container);
    });
    const img = container?.querySelector('img')
    expect(img?.src).toBe('' || 'http://localhost/')
    expect(img?.dataset.src).toBe(src)
})
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
it('load an image with the low quality img when smSrc attribute isn t empty', () => {
    const src: string = "/test.jpg"
    const smSrc: string = "/small.jpg"
    act(() => {
        ReactDOM.render(<ProgImg src={src} smSrc={smSrc} conf={{isLazy: true}}/>, container);
    });
    const smImg = container?.querySelector('img')
    const allImg = container?.querySelectorAll('img')
    expect(smImg?.dataset.src).toBe(smSrc)
    expect(allImg?.length).toBe(2)
})

it('set custom transition property', () => {
    const delay: number = 0.3
    const transEffect: string = 'ease-in'
    act(() => {
        ReactDOM.render(<ProgImg src="/test.jpg" conf={{isLazy: false}} delay={delay} trans={transEffect}/>, container);
    });
    const img = container?.querySelector('img')
    expect(img?.style.transition).toBe(`opacity ${delay}s ${transEffect}`)
})
