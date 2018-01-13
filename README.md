
# react-native-responsive-layout

A set of components and utilities that make building responsive RN user interfaces easier by bringing concepts used in web development.

## Installation

This package is only **compatible with RN>=42**, as older versions do not support percentage-based widths.  
To install the latest version simply run:

```bash
yarn add react-native-responsive-layout
```
or if you prefer using `npm`:
```bash
npm install --save react-native-responsive-layout
```

## Responsive layout

Even though React-Native offers a great and fast way to build complex native applications, building a responsive UI still isn't as easy as on the web. With RN42, things got drastically better when percentage based widths landed. However, building responsive applications is quite hard without introducing many conditional renderings. This framework aims to bring many concepts developers are used to on the web to simplify native development.

The most important concept this framework brings is the **ability to specify different component sizes and to select styles depending on viewport size**. This makes building responsive elements as easy as using Bootstrap's grid system.

The framework is built to be **mobile first**, so grid elements collapse to the largest size class they can fit. This way you don't need to define sizes/styles for all breakpoint sizes, rather you can implement only those that matter and it will fallback to the first smaller one that it fits. For example, if you define only `xsSize` and `lgSize`, all sizes smaller than large will fallback to extra small (`xsSize`), but on all larger ones it will pick large one (`lgSize`). This gives you the flexibility to precisely target most device sizes.

## Examples

### Responsive elements

Any element that contains multiple different size classes will act responsive and adapt its size. Let's see how can we implement *single column design* on typical phones and *two columns design* on larger ones. 

While rendering, it will render largest size class that is smaller or equal to the determined device size. Since design is mobile first, it doesn't matter if you use `size` or `xsSize`, since overriding it with larger size (eg. `xlSize` for tablets) would have the same effect. They coexist because of semantics -- when size is fixed across all size classes, it makes more sense to just use `size`.

```jsx
<Grid>
  <Section>
    <Block xsSize="1/1" smSize="1/2" /> {/* 1.1 */}
    <Block xsSize="1/1" smSize="1/2" /> {/* 1.2 */}
    <Block xsSize="1/1" smSize="1/2" /> {/* 1.3 */}
  </Section>
  <Section>
    <Block size="1/1" smSize="1/2" /> {/* 2.1 */}
  </Section>
</Grid>
```

In order to better show how it works, this [example](examples/1-responsive-elements.js) has sections marked with red border and each block is colored and enumerated.

![Example showing how elements change size depending on screen size.](docs/images/1-responsive-elements.png)

You can also see how columns are placed next to each other until they reflow to a new line, when needed you can **break into new row manually using another section**.


### Hidden elements

Sometimes we only want to display specific elements on larger or smaller devices. To do so, we can use hidden classes (eg. `mdHidden`).

In this [example](examples/2-hidden-elements.js) we will hide two elements from the first section on larger phones, and only show the element from the second section on smaller phones.

Again, since the grid is mobile first, it will be hidden on specified and **larger** device sizes. This means that, in order to hide elements on larger devices, it is enough to define `smHidden` and the elements won't be displayed on larger devices. But, in order for the element to be hidden only on smaller devices, we need to define it as hidden for small and then override it for larger devices.

```jsx
<Grid>
  <Section>
    <Block />          {/* 1.1 */}
    <Block smHidden /> {/* 1.2 */}
    <Block smHidden /> {/* 1.3 */}
  </Section>
  <Section>
    <Block xsHidden smHidden={false} /> {/* 2.1 */}
  </Section>
</Grid>
```

![Example showing how elements can be hidden depending on screen size.](docs/images/2-hidden-elements.png)

### Shifting elements

Sometimes we need center an element or push it to the right, you can do this by adding filler `Block` elements to ensure reflow on each design, but the simplest way to do it is by using *auto width* elements, which use flex to fill the space.

To keep an element on the **left** and keep the remaining space free, simply put the next element into a new section. To **center** an element, add a stretching element before and after the centered element. To shift it to the **right**, just add a single stretching element before.


```jsx
<Grid>
  <Section>
    <Block xsSize="1/2" smSize="1/4"></Block> {/* Left */}
  </Section>
  <Section>
    <Block size="auto" />
    <Block xsSize="1/2" smSize="1/4"></Block> {/* Center */}
    <Block size="auto" />
  </Section>
  <Section>
    <Block size="auto" />
    <Block xsSize="1/2" smSize="1/4"></Block> {/* Right */}
  </Section>
  <Section>
    <Block xsSize="1/3" smSize="1/4"></Block> {/* Left */}
    <Block size="auto" />
    <Block xsSize="1/3" smSize="1/4"></Block> {/* Right */}
  </Section>
</Grid>
```

When using stretching elements, **put items from the same line into the same section**, just like in this [example](examples/3-shifting-elements.js). Stretching elements have no way of knowing when to break into the next line.


![Example showing how stretching elements can be used to shift other elements.](docs/images/3-shifting-elements.png)


### Fixed size elements

Sometimes we need to use elements with a static size. In this example we are going to combine fixed size, responsive and stretching elements.

The following [example](examples/4-fixed-size-elements.js) shows just that.

```jsx
<Grid>
  <Section>
    <Block style={{ width: 100 }} />    {/* Fixed */}
    <Block size="auto" />
    <Block xsSize="1/2" smSize="2/3" /> {/* Responsive */}
  </Section>
</Grid>
```

![Example showing how one can use fixed size elements as well.](docs/images/4-fixed-size-elements.png)

### Conditionally rendering different styles or components

When rendering content depending on device size, we often want to style some parts of the components conditionally as well. In order to make that easier, there is HOC available that wraps your component and provides it with a selector function which you can use to select the appropriate values.

For [example](examples/5-conditional-styling.js), if we want to render components using different styles we can wrap our component using `withSizeClass` and use the `sizeSelector` prop to select the appropriate style or component -- we can even render a completely different component depending on device size.

```jsx
const WrappedComponent = withSizeClass(({ sizeSelector }) => {
  const style = sizeSelector({
    xs: styles.lightContent,
    sm: styles.darkContent,
  });

  return (
    <View style={style} />
  );
});
```

As shown, the `sizeSelector` function expects to be provided with an object that contains values defined for grid sizes (breakpoints). It returns either the value defined for the current grid, or the value of the closest size defined that is smaller than the current grid size (i.e. the first previous defined breakpoint).

```jsx
<Grid>
  <Section>
    <Block>
      <WrappedComponent />
    </Block>
  </Section>
</Grid>
```

![Example showing how to use conditional styling HOC.](docs/images/5-conditional-styling.png)


### Layout content either horizontally or vertically

Just by changing the `direction` prop, we can select in which direction the layout should flow. 
Keep in mind that, when setting the direction to 'horizontal', breakpoints will be based on device **height** rather than width. This is because most use cases for horizontal flow are in landscape orientation, where device height is a greater concern.

```jsx
<Grid direction="horizontal">
  <Section>
    <Block xsSize="1/1" smSize="1/2" /> {/* 1.1 */}
    <Block xsSize="1/1" smSize="1/2" /> {/* 1.2 */}
    <Block xsSize="1/1" smSize="1/2" /> {/* 1.3 */}
  </Section>
  <Section>
    <Block size="1/1" smSize="1/2" />   {/* 2.1 */}
  </Section>
</Grid>
```
![Example showing using horizontal direction.](docs/images/6-horizontal-direction.png)


### Stretching grid

By default, grid size will be based on the content size. If you want it to stretch over the available space, simply set the `stretch` property on the grid. It will set the appropriate styles on child `Box` and `Section` components and enable their children to be properly rendered using flex.

In this case, by default, both `Grid` and `Section` will be configured with `flex: 1` which you can override by providing a custom style to any of those components. This way you can tweak size ratios of different elements.

```jsx
<Grid stretch>
  {/* This ensures grid sections and blocks are configured to stretch. */}

  <Section style={{ height: 80, flex: 0 }}>
    {/* Since by default Sections would stretch we need to override their flex
    style in order for them to stay fixed height. */}
    <Block />
  </Section>
  <Section>
    <Block size="1/4" />  {/* L */}
    <Block size="auto" /> {/* Content */}
  </Section>
  <Section style={{ height: 80, flex: 0 }}>
    <Block />
  </Section>
</Grid>
```

![Stretching grid demonstration.](docs/images/7-stretching.png)

Keep in mind that when rendering components using flex inside ScrollView, you should set `{ flex: 1 }` as `contentContainerStyle` prop in order for it to stretch over the entire space. For complete examples take a look at source for the above [normal](examples/7-stretch-disabled.js) and [stretching](examples/7-stretch-enabled.js) examples.


## Size Classes

Sizing is mobile first, it renders depending on the current size and fallbacks to lower sizes for missing breakpoint values. Therefore there is no need to explicitly define all sizes, it is possible only to target breakpoints you care about.

Based on currently popular device point sizes, grid breakpoints are chosen so it would be possible to precisely target devices of all sizes. 

Most notable **differences compared to CSS frameworks** are that we differentiate two portrait sizes for mobile devices since in many cases a 100 points difference which covers almost 1/4th of the screen could be used to render things differently.

The second difference is that we are not interested in desktop sizes, so we can also have more break points on large devices where there could also be a significant difference in sizes.

Based on popular device sizes grid, breakpoints are divided as following:

| Size | Breakpoint | Devices                             |
|------|------------|-------------------------------------|
| xs   | 320 pt     | mobile                              |
| sm   | >= 411 pt  | large mobile                        |
| md   | >= 568 pt  | mobile - landscape                  |
| lg   | >= 768 pt  | tablet                              |
| xl   | >= 1024 pt | tablet - landscape, large tablet    |
| xxl  | >= 1280 pt | large tablet - landscape            |

## Further Reading

Best way to find out further is to look into [API docs](docs/api/).
